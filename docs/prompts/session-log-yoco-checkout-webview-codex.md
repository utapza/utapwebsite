> **Note:** This file captures a **point-in-time implementation log** (Codex session). **Verify** dependency and lint statements against current **`utap-apps`** / **`utap-vendors`** before relying on them.

Implemented the **Yoco** checkout flow.

Changed:

- Product ordering now creates a pending order, calls the vendor **`create-yoco-checkout`** **Netlify Function**, and opens the returned **Yoco** `redirectUrl` in **`YocoCheckoutWebView`**.
- Removed the fake card-entry modal and **Stripe**-first UI from the active order flow.
- Added **`yocoPaymentService.js`** and wired **`ProductOrderScreen.js`** / **`orderService.js`** to the Netlify → **Yoco** path.
- Updated **`yoco-webhook.ts`** to tolerate `orderId` metadata and generate event tickets after verified paid webhooks.

**Dependency note:** **`@stripe/stripe-react-native`** may still appear in **`package.json`** for native project history—confirm with `package.json` / `pod install` before claiming Stripe is fully removed.

Validation (at time of writing):

- `npm run build` passed in **`utap-vendors`**.
- `npx expo config --json` passed in **`utap-apps`**.

Sources: [Yoco create checkout](https://developer.yoco.com/api-reference/checkout-api/checkout/create-checkout), [Yoco online payments guide](https://developer.yoco.com/guides/online-payments).
