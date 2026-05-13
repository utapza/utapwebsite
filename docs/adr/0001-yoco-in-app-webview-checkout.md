# ADR-0001: Yoco checkout in uTap via in-app WebView

**Date**: 2026-05-11  
**Status**: accepted  
**Scope**: uTap mobile app (`utap-apps`), Yoco hosted checkout, vendor return URLs from Netlify `create-yoco-checkout`

## Context

Ushop orders used Yoco’s hosted checkout by opening the `redirectUrl` in the **system browser** (`Linking.openURL`). After payment, Yoco sent shoppers to the vendor site (for example `…/payment/success?orderId=…`). From there, “back to uTap” style actions often failed to return users to the app, and instead left them browsing the vendor marketing site. That broke continuity, hurt trust, and added friction right after conversion.

The payment is still finalized using Yoco’s **hosted** checkout (no card data in the app). The problem was only **where** that hosted page ran (external browser vs embedded WebView).

## Decision

Load the Yoco `redirectUrl` inside the React Native app using **`react-native-webview`** in a full-screen modal with a clear close affordance. Detect completion by watching navigation to the existing vendor return URLs built in `create-yoco-checkout` (`/payment/success`, `/payment/cancelled`, `/payment/failed`) and matching the `orderId` query parameter to the order that started checkout. On success or terminal failure, dismiss the WebView and show in-app confirmation or guidance.

URL classification lives in `utap-apps/src/utils/yocoCheckoutUrls.js`. The UI shell lives in `utap-apps/src/components/YocoCheckoutWebView.js`. `ProductOrderScreen` is the first consumer; `orderService.processOrderPayment` documents that any future “pay again” UI should reuse the same pattern instead of opening the browser.

## Alternatives considered

1. **Keep external browser**  
   **Pros**: simplest, no WebView maintenance.  
   **Cons**: poor return-to-app behavior and fragmented UX (the original pain).

2. **Yoco popup or fully custom card form in-app**  
   **Pros**: could feel more “native”.  
   **Cons**: Yoco’s public flow here is hosted checkout via redirect URL; popups or direct card entry would imply a different Yoco product integration, PCI scope, and new backend work. Rejected for this iteration.

3. **Deep link from vendor success page into the app**  
   **Pros**: could work with external browser if universal links are perfect.  
   **Cons**: still leaves the user in the browser during payment; depends on OS, domain, and marketing site links. WebView keeps the whole journey in one surface.

## Consequences

### Positive

- Users stay inside uTap for the sensitive part of the journey (paying and seeing the result).
- Same Netlify function and Yoco redirect URLs are reused; no change required to `create-yoco-checkout` success or webhook behavior for this ADR.
- Clear extension point for other screens that need to resume checkout (`YocoCheckoutWebView` + shared URL helper).

### Negative

- WebView behavior can differ slightly by OS version (cookies, 3D Secure, bank pages). `thirdPartyCookiesEnabled` is enabled on Android to reduce friction where banks rely on cookies.
- Users who close the modal without finishing leave the order pending; messaging should stay honest that confirmation may follow the Yoco webhook.

### Risks and mitigations

- **Wrong success detection**: strict `orderId` match on return URLs reduces false positives.  
- **Redirects that omit query params**: if Yoco or the vendor ever changed return URLs without `orderId`, detection would need updating alongside `create-yoco-checkout`.
