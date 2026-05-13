// Curated Pexels image URLs.
// Pexels CDN allows direct image links without an API key. If any 404, swap the
// photo ID. Source: https://www.pexels.com
//
// Attribution shown in footer per Pexels guidelines.

const pexels = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const images = {
  // Hero — student on phone, campus vibe
  heroPrimary: pexels(5077063, 1920),
  heroSecondary: pexels(7691737, 1600),

  // Pillar 1 — Identity (tap in)
  identity: pexels(4144222, 1400),

  // Pillar 2 — Commerce (uShop)
  commerce: pexels(4039922, 1400),

  // Pillar 3 — Events (uGig)
  events: pexels(2774556, 1400),

  // Vendor strip — small business owner
  vendor: pexels(4549408, 1400),

  // About / team
  about: pexels(3184292, 1600),

  // Universities
  university: pexels(207692, 1600),

  // Pricing — calculator / money calm
  pricing: pexels(3760067, 1400),

  // Footer accent
  footer: pexels(1438081, 1920),
} as const;

export type ImageKey = keyof typeof images;
