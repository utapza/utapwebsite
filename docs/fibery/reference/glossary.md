# Glossary

Short definitions shared by **business** and **engineering**. Wording here is descriptive, not legal.

| Term | Meaning |
|------|---------|
| **uTap** | The student mobile product (digital wallet + NFC + campus commerce) and the wider platform of supporting apps. |
| **uTap mobile / utap-apps** | The React Native / Expo application students install (`com.utap.utapwallet`). |
| **Ushop** | In-app campus shopping: browse stores/products, place orders (often pickup). |
| **uGig** | In-app area focused on gigs / sports-store style listings—implemented as a filtered slice of the same store/product model as Ushop. |
| **Vendor portal** | Web app (`utap-vendors`) where store operators manage their side of commerce. |
| **Admin** | Web app (`utap-admin`) where internal staff manage universities, vendors, catalogues, categories. |
| **Marketing site** | Public web presence (`utapwebsiite`). |
| **Supabase** | Hosted Postgres + Auth + APIs used as the main backend. |
| **RLS** | Row Level Security—database rules deciding which rows each logged-in user may see or change. Critical when using the anon key in clients. |
| **Anon key** | Supabase public client key bundled with apps. Not a secret; RLS does the real enforcement. |
| **NFC** | Near Field Communication—tap-to-read between phone and physical card / reader. |
| **MIFARE** | Family of contactless cards; many student IDs use **MIFARE Classic** style layouts. |
| **Scanning** | Reading data from a physical card using the phone’s NFC hardware. |
| **Emulation** | Presenting stored card data from the phone so a reader treats it like a card—**Android-heavy** in practice; campus acceptance varies. |
| **HCE** | Host Card Emulation—Android mechanism where the phone acts like a card (see native docs). |
| **expo-mifare-scanner / @utapza/expo-mifare-scanner** | Internal Expo native module wrapping low-level NFC behaviour for the app. |
| **Dev client** | Custom Expo development build that includes native modules; required for NFC development—not the same as Expo Go. |
| **EAS** | Expo Application Services—cloud builds for iOS/Android binaries. |
| **Yoco** | South Africa–focused **payment service provider** used for hosted online checkout; **utap-apps** opens **Yoco** URLs in-app; **`utap-vendors`** Netlify Functions create checkouts and **`yoco-webhook`** updates Supabase. |
| **Netlify Functions** | **Serverless** TypeScript endpoints deployed with **`utap-vendors`** (and invoked from mobile/admin as HTTP). Hold **Yoco** secrets, **Supabase service role**, **Resend** API key—never in mobile bundles. |
| **Stripe** | **Legacy** in **`utap-apps`** (`stripePaymentService.js`, optional **React Native** dependency); **active student order checkout uses Yoco**. |
| **React Native Paper** | Material-design-aligned component library used as the main UI primitive layer on mobile (`PaperProvider`, buttons, lists). |
| **Theme (mobile)** | Central colours and fonts defined in **`App.js`** and consumed via Paper’s theme APIs—see [`../design/design-and-ui-ux.md`](../design/design-and-ui-ux.md). |
