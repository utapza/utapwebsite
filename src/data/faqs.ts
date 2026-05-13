export type FAQ = { q: string; a: string };

export const homeFaqs: FAQ[] = [
  {
    q: 'Does my card actually work?',
    a: "If your university uses a standard student card we support, yes. We're growing the list — check the help centre or try a scan.",
  },
  {
    q: 'What does it cost students?',
    a: 'Nothing. Downloading uTap is free. You pay for what you order, nothing more.',
  },
  {
    q: 'Where are you live right now?',
    a: "We're rolling out South African campuses one at a time. If yours isn't on the list, leave your details — we'll let you know.",
  },
];

export const vendorFaqs: FAQ[] = [
  {
    q: 'What do I need to start?',
    a: 'An email, a phone, a Yoco bank account, and a store on or near campus.',
  },
  {
    q: 'How often do I get paid?',
    a: 'Automatic payouts on the 28th of each month. You can request a payout any time with a R\u202f50 minimum.',
  },
  {
    q: 'Can I run more than one store?',
    a: 'Yes. Add as many as you have outlets. One log-in, one finance tab.',
  },
  {
    q: 'What does uTap charge?',
    a: 'A small percentage of each paid order, plus the Yoco transaction fee. See the pricing page for the exact split.',
  },
  {
    q: 'Can I run promotions?',
    a: 'Yes. Vouchers, discounts, and bundle deals. Set start and end times, set who can use them.',
  },
];

export const pricingFaqs: FAQ[] = [
  {
    q: 'Is there a setup fee?',
    a: "No. Listing your store and your products is free. We only earn when you do.",
  },
  {
    q: 'Who pays the Yoco fee?',
    a: "The vendor. It's shown separately on your statement so the maths is never hidden.",
  },
  {
    q: 'Can students see any fees?',
    a: "No. Our commission comes out of the vendor's side, not the student's total.",
  },
  {
    q: 'When can I request a payout?',
    a: 'Any time, with a R\u202f50 minimum. Automatic payouts also run on the 28th of every month.',
  },
  {
    q: 'Do refunds cost me?',
    a: "If a vendor cancels, the student is refunded automatically and the order doesn't count toward commission.",
  },
];
