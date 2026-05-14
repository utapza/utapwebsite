#DContext
Read these files before writing anything:

- `utapwebsite/docs/fibery/architecture/domain-level-knowledge.md`
- `utapwebsite/docs/fibery/platform/platform-map.md`
- `utapwebsite/docs/plans/2026-05-12-notifications-system-trigger-audit.md`
- `utapwebsiite/docs/prompts/notifications-system-execution.md`
- `utapwebsiite/docs/prompts/notifications-system-execution-2.md`

Phases 1 and 2 are complete. The following are confirmed live:

- NotificationBanner component in utap-apps
- Student orders Realtime subscription
- Vendor new order toast in OrdersPage.tsx
- Push token registration/unregistration wired into AuthContext
- send-push-notification.ts sending to Expo Push API
- yoco-webhook.ts firing push for: payment confirmed, order cancelled,
  payment failed, refund processed
- Resend emails: order_refunded, order_payment_failed, payout_completed
- push_tokens table exists with columns: id, profile_id, token, platform,
  created_at, updated_at

Key confirmed schema facts — do NOT query or assume differently:

- orders.user_id is the student foreign key (not profile_id, not student_id)
- vendors table has: id, name, email (email is directly on the vendor row)
- products table has status column with values:
  pending_review | approved | rejected | inactive
- admin_users table has: id, email, full_name, role, is_active
- vendor_earnings already stores: vendor_net_amount, platform_fee_amount,
  system_net_earning_amount, yoco_transaction_fee_amount
- No notifications table exists yet — must be created in this phase

Do not re-implement anything from Phase 1 or 2. Build on top of it.

---

## Goal

Implement Phase 3: in-app notification history, product approval emails,
and new vendor admin alert.

Use multi-agent parallelism. Spawn sub-agents per workstream below.
Each agent must read the context files above before touching any code.
Each agent must check what already exists before creating anything.

---

## Pre-flight check (run before spawning agents)

1. Does a notifications table exist in Supabase? (confirmed: NO — create it)
2. Does utap-apps have a notification history screen or component?
3. Does utap-vendors have a notification history screen or component?
4. Does yoco-webhook.ts or any admin handler send email on products.status
   change to approved or rejected?
5. Does any code path send an alert to admin_users when a new vendor signs up?

Report what is DONE, PARTIAL, or MISSING then spawn agents only for
what is MISSING or PARTIAL.

---

## Agent A — notifications table migration

Output the following SQL. Do NOT apply it — flag it for manual review.

```sql
create table public.notifications (
  id           uuid primary key default gen_random_uuid(),
  recipient_id uuid not null,               -- profile_id for students,
                                            -- vendor id for vendors,
                                            -- admin_user id for admins
  recipient_type text not null              -- 'student' | 'vendor' | 'admin'
    check (recipient_type in ('student', 'vendor', 'admin')),
  type         text not null,               -- event type slug e.g.
                                            -- 'order_confirmed',
                                            -- 'order_ready',
                                            -- 'payout_completed',
                                            -- 'product_approved',
                                            -- 'product_rejected',
                                            -- 'new_vendor_registered'
  title        text not null,
  body         text not null,
  data         jsonb default '{}'::jsonb,   -- arbitrary deep-link payload
  read_at      timestamptz,                 -- null = unread
  created_at   timestamptz not null default now()
);

-- index for fast unread counts and feed queries
create index notifications_recipient_unread
  on public.notifications (recipient_id, recipient_type, created_at desc)
  where read_at is null;
```

RLS policies to output alongside (flag for manual review, do not apply):

```sql
-- Students can read and update (mark read) their own notifications
alter table public.notifications enable row level security;

create policy "student read own notifications"
  on public.notifications for select
  to authenticated
  using (
    recipient_type = 'student'
    and recipient_id = auth.uid()
  );

create policy "student mark own notifications read"
  on public.notifications for update
  to authenticated
  using (
    recipient_type = 'student'
    and recipient_id = auth.uid()
  )
  with check (
    recipient_type = 'student'
    and recipient_id = auth.uid()
  );

-- Vendors can read and update their own notifications
create policy "vendor read own notifications"
  on public.notifications for select
  to authenticated
  using (
    recipient_type = 'vendor'
    and recipient_id = auth.uid()
  );

create policy "vendor mark own notifications read"
  on public.notifications for update
  to authenticated
  using (
    recipient_type = 'vendor'
    and recipient_id = auth.uid()
  )
  with check (
    recipient_type = 'vendor'
    and recipient_id = auth.uid()
  );

-- Admin can read their own notifications
create policy "admin read own notifications"
  on public.notifications for select
  to authenticated
  using (
    recipient_type = 'admin'
    and recipient_id = auth.uid()
  );

create policy "admin mark own notifications read"
  on public.notifications for update
  to authenticated
  using (
    recipient_type = 'admin'
    and recipient_id = auth.uid()
  )
  with check (
    recipient_type = 'admin'
    and recipient_id = auth.uid()
  );

-- Service role bypasses RLS — no extra policy needed
-- No INSERT policy for authenticated role:
-- only Netlify functions (service role) write to this table
```

---

## Agent B — notification write helper (server side)

Create `utap-vendors/netlify/functions/lib/writeNotification.ts`

This is a pure utility imported by other Netlify functions.
No HTTP handler. No CORS. Service role only.

```
export async function writeNotification(payload: {
  recipient_id: string
  recipient_type: 'student' | 'vendor' | 'admin'
  type: string
  title: string
  body: string
  data?: Record<string, unknown>
}): Promise<void>

Logic:
1. Use the Supabase service role client (same init pattern as
   create-yoco-checkout.ts)
2. INSERT into notifications table
3. Wrap in try/catch — must never throw or propagate
4. Log errors only, do not rethrow
```

---

## Agent C — wire writeNotification into existing webhook and payout paths

Import writeNotification from `./lib/writeNotification` in each file below.

Check what calls already exist before adding. Only add what is missing.

### In yoco-webhook.ts — add notification writes alongside existing push calls

| Event                          | recipient_type | type              | title               | body                                                   |
| ------------------------------ | -------------- | ----------------- | ------------------- | ------------------------------------------------------ |
| payment_status → 'paid'        | student        | 'order_confirmed' | "Payment confirmed" | "Your order has been confirmed and is being prepared." |
| order status → 'ready'         | student        | 'order_ready'     | "Order ready"       | "Your order is ready for collection."                  |
| order status → 'cancelled'     | student        | 'order_cancelled' | "Order cancelled"   | "Your order was cancelled. You will not be charged."   |
| reverse_order_earning (refund) | student        | 'order_refunded'  | "Refund processed"  | "Your refund is on its way."                           |

For recipient_id use orders.user_id (confirmed column name).
Pass order_id in the data field for deep linking.

### In the payout completion handler (wherever payout_completed email fires)

| Event            | recipient_type | type               | title              | body                                           |
| ---------------- | -------------- | ------------------ | ------------------ | ---------------------------------------------- |
| Payout completed | vendor         | 'payout_completed' | "Payout processed" | "Your payout of R[amount] has been processed." |

For recipient_id use the vendor's id from the payout row.
Pass payout amount in data field.

All writeNotification calls are fire-and-forget. Must never affect
HTTP response codes or throw.

---

## Agent D — product approval email + notification

### Where to wire this

Find where `products.status` is updated to `approved` or `rejected` in
`utap-admin`. Check `utap-admin/src/pages/Products.tsx` and any related
database calls. The update is likely a direct Supabase call from the SPA.

If the status update is in the admin SPA (not a Netlify function):

- Add email send via the existing emailApi pattern in utap-admin
- Add a writeNotification call — but since this is client-side and
  writeNotification uses service role, you cannot call it directly
  from the SPA. Instead, create a minimal new Netlify function:

Create `utap-vendors/netlify/functions/notify-product-decision.ts`

```
POST handler (internal — bearer auth using the same pattern as
send-transactional-email.ts)

Body: {
  product_id: string
  vendor_id: string
  product_name: string
  decision: 'approved' | 'rejected'
  rejection_reason?: string
}

Steps:
1. Validate bearer token (same CORS/auth pattern as send-transactional-email)
2. Fetch vendor email from vendors table using service role client:
   SELECT email FROM vendors WHERE id = vendor_id
3. Send email via sendResendEmail:
   template: 'product_approved' or 'product_rejected'
   data: { product_name, rejection_reason (if rejected) }
4. Call writeNotification:
   recipient_id: vendor_id
   recipient_type: 'vendor'
   type: 'product_approved' or 'product_rejected'
   title: "Product approved" or "Product rejected"
   body: "[product_name] has been approved and is now live." or
         "[product_name] was not approved. [rejection_reason]"
   data: { product_id }
5. Return { success: true }
```

In `utap-admin` after the product status DB update, call
`notify-product-decision` via the existing vendor functions base URL
pattern (same as transactionalEmailService pattern).

Template definitions to create in Resend if using dashboard templates:

| Template name    | Subject                    | Variables                      |
| ---------------- | -------------------------- | ------------------------------ |
| product_approved | "Your product is now live" | product_name                   |
| product_rejected | "Product review update"    | product_name, rejection_reason |

---

## Agent E — new vendor admin alert

### Where to wire this

Find where vendor signup completes in `utap-vendors`. Check
`utap-vendors/src/hooks/useAuth.ts` or `SignupForm.tsx` for the
Supabase auth signup call.

After successful vendor signup:

1. Call writeNotification for every active admin:
   - Query admin_users WHERE is_active = true to get all admin ids
   - For each, INSERT a notification:
     recipient_id: admin.id
     recipient_type: 'admin'
     type: 'new_vendor_registered'
     title: "New vendor registered"
     body: "[vendor name or email] has signed up and is pending review."
     data: { vendor_id }

Since the vendor signup is client-side (Supabase auth from the SPA),
you cannot call writeNotification directly. Add a minimal Netlify function:

Create `utap-vendors/netlify/functions/notify-new-vendor.ts`

```
POST handler (internal — no external CORS needed, called from vendor
signup flow with service role or a simple shared secret)

Body: {
  vendor_id: string
  vendor_name: string
  vendor_email: string
}

Steps:
1. Validate request (simple bearer or internal secret — check how other
   internal functions handle this)
2. Fetch all active admins: SELECT id, email FROM admin_users
   WHERE is_active = true
3. For each admin, call writeNotification with type 'new_vendor_registered'
4. Optionally send a single email to a configured ops address
   (check if there is an OPS_EMAIL env var or similar — do not hardcode)
5. Return { success: true, notified: count }
```

Call `notify-new-vendor` from the vendor signup success handler in the SPA.

---

## Agent F — notification history UI

### F1. Student notification screen (utap-apps)

Create `utap-apps/src/screens/NotificationsScreen.js`

- Fetch notifications WHERE recipient_id = currentUser.id
  AND recipient_type = 'student'
  ORDER BY created_at DESC
  LIMIT 50
- Use the same Supabase client pattern as other screens
- Show a list: title, body, relative time (e.g. "2 hours ago")
- Unread notifications visually distinct (e.g. bold title or accent dot)
- Tap to mark as read (UPDATE notifications SET read_at = now()
  WHERE id = notification_id)
- Subscribe to Realtime INSERT on notifications filtered by
  recipient_id = currentUser.id so new notifications appear live
- Empty state: "You have no notifications yet"
- Loading and error states following existing screen patterns

Add a bell icon to the navigation — check where the tab bar or header
is configured in `utap-apps` (likely App.js or a navigation file) and
add the bell with an unread badge count. Query COUNT where read_at is null
for the badge. Use existing icon library in the app (check package.json
for @expo/vector-icons or similar before picking an icon name).

### F2. Vendor notification panel (utap-vendors)

Add a notification dropdown or slide-out panel to the vendor portal header.

- Fetch 20 most recent notifications for the current vendor
  WHERE recipient_id = currentUser.id AND recipient_type = 'vendor'
- Show title + body + relative time per item
- Unread count badge on the bell icon in the header
- Click notification to mark it read
- "Mark all as read" button
- Check utap-vendors header component location before editing —
  look for a Header.tsx or layout file
- Use existing UI components and styles — do not add new libraries

### F3. Admin notification indicator (utap-admin)

Add a bell icon with unread badge to the admin dashboard header/nav.

- Fetch unread count only on mount and poll every 60 seconds
  (no Realtime needed for admin — low urgency)
- Clicking the bell shows a simple dropdown of the 10 most recent
  admin notifications
- Mark as read on click
- Check existing admin header/nav component before creating anything

---

## Global constraints (all agents)

- Check existing files before creating anything — extend, never duplicate
- No new npm packages without flagging explicitly and stopping for approval
- All Supabase writes in Netlify functions use the service role client
- All writeNotification, sendResendEmail, and sendPushNotification calls
  are try/catch wrapped and must never throw or affect HTTP response codes
- Do not apply any SQL — output it and flag for manual review
- The notifications table INSERT is service role only —
  never expose an authenticated INSERT policy
- After each file change, state which file was changed and why
- If any agent hits an ambiguity it cannot resolve from the codebase,
  stop and ask rather than guess

```

```
