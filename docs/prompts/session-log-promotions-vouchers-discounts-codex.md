Implemented the promotions/vouchers/discounts framework across the app, vendor dashboard, admin app, and Supabase migrations.

**Core Pieces**
- Added migration: [20260511133000_promotions_vouchers_discounts.sql](/Users/nonwork/dev/utap-vendors/supabase/migrations/20260511133000_promotions_vouchers_discounts.sql)
  - `promotions`
  - `promotion_targets`
  - `promotion_redemptions`
  - order subtotal/discount/payable columns
  - finance settings max-discount controls
  - server-side validation RPC: `validate_order_promotions`
  - redemption RPC: `create_promotion_redemptions_for_order`
  - updated earning logic for system-funded vs vendor-funded discounts

**Financial Model**
- UTAP/admin promotions are `funded_by = system`.
  - Vendor earnings are protected.
  - UTAP/system net is reduced by the funded discount.
- Vendor promotions are `funded_by = vendor`.
  - Vendor net is reduced.
  - UTAP platform fee still uses the original subtotal, so UTAP revenue share is protected.
- Yoco fee is calculated from what the customer actually pays.

**Mobile Checkout**
- Added [promotionService.js](/Users/nonwork/dev/utap-apps/src/services/promotionService.js).
- Updated [ProductOrderScreen.js](/Users/nonwork/dev/utap-apps/src/screens/ProductOrderScreen.js):
  - voucher input
  - automatic app-discount preview
  - discount summary
  - discounted Yoco checkout total
- Updated [orderService.js](/Users/nonwork/dev/utap-apps/src/services/orderService.js):
  - server-validates promotions before order insert
  - stores subtotal, discount, payable amount, and promotion snapshot
  - creates redemption rows for applied promos

**Vendor Dashboard**
- Added [PromotionsPage.tsx](/Users/nonwork/dev/utap-vendors/src/components/promotions/PromotionsPage.tsx).
- Vendors can create:
  - vouchers
  - app discounts
  - store/category targeted promotions
- Added Promotions tab to vendor navigation.

**Admin App**
- Added [Promotions.tsx](/Users/nonwork/dev/utap-admin/src/pages/Promotions.tsx).
- Admins can create UTAP-funded vouchers/app discounts targeted by:
  - app-wide
  - store
  - product category
  - campus
  - university
- Shows redemptions and funded discount impact.
- Added `/admin/promotions` route and sidebar entry.

**Verification**
- Vendor app `npm run lint`: passed.
- Vendor app `npm run build`: passed.
- App JS syntax checks passed for changed mobile files.
- Admin targeted ESLint passed for new/changed admin files.
- Full admin build/lint still fail due existing unrelated TS/lint issues in older admin files/components.

Note: apply the earnings/payout migration before this promotions migration, because this promotion migration extends `finance_settings` and `vendor_earnings`.