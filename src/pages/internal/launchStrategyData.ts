export const intro = {
  whatIs: {
    heading: 'What is the NMU Alpha?',
    body: [
      'We are running a closed test at NMU with 5–10 vendors and 100 students. This isn\'t a public launch; it\'s where we find the bugs before everyone else does.',
      'The goal is to prove two things: that the uShop ordering system is faster than standing in a queue, and that vendors trust us with their money. We also want to see the first uGig events booked — students finding and attending campus gigs.',
      'After the PE trip, we\'ll support them remotely for 4–6 weeks from Joburg. If vendors are still trading and students are still ordering after a month without us being there, the pilot is a success.',
    ],
  },
  whyNow: {
    heading: 'Why NMU?',
    body: [
      'NMU is our first real test. Every expansion conversation later will start with: "Does it actually work on a real campus?" We need the data from these first 100 students to prove it does.',
      'We\'re capping the Alpha to keep it manageable. We want quality feedback, not high volume. We need to find the friction points in uShop and uGig events now so they don\'t kill the public launch later.',
      'The biggest hurdle is vendor trust. They\'re nervous about where their money goes. Our strategy is simple: show up in person, show them the dashboard, and show them we\'re real people.',
    ],
  },
};

export const appStoreStatus = {
  heading: 'App Distribution — Alpha Constraints',
  status: [
    {
      platform: 'iOS (Apple)',
      state: 'Apple Developer account active',
      alphaPath: 'TestFlight — invite alpha students via email. Up to 100 external testers. No App Store listing required.',
      action: 'Create a TestFlight build and generate invite links before the PE trip.',
      priority: 'Ready to execute',
    },
    {
      platform: 'Android (Google)',
      state: 'Google Play Developer account NOT yet registered',
      alphaPath: 'APK sideloading — share the .apk file directly via WhatsApp or a download link. Students enable "Install from unknown sources" once.',
      action: 'Register Google Play Developer account (one-time $25 USD fee). For the Alpha, APK sideload is acceptable. For Beta/public launch, a Play Store listing is required.',
      priority: 'Action required before launch',
    },
  ],
  note: 'For the Alpha, TestFlight (iOS) and APK sideload (Android) are the correct distribution paths. Do not wait for a Play Store listing to run the Alpha — but register the Google Play account now so it is ready for Beta.',
};

export const materialsChecklist = {
  physical: [
    { item: 'Founding Collaborator Certificates', min: '10', why: 'Formal recognition for vendors to build trust and social proof.' },
    { item: 'QR Code Counter Flyers', min: '25', why: '2-3 per vendor. "Skip the queue" hook for students standing at the counter.' },
    { item: 'Available on uTap Stickers', min: '15', why: 'Window/counter branding to show students the vendor is live.' },
    { item: 'Recruitment A5 Flyers', min: '50', why: 'Hand-to-hand during class talks and res block notice boards.' },
    { item: 'Pitch One-Pagers', min: '10', why: 'Physical backup for vendor discovery meetings to explain the 100% margin model.' },
  ],
  digital: [
    { item: 'Alpha Student WhatsApp Group', status: 'Ready', action: 'Generate invite link for Class Talk slides.' },
    { item: 'Founding Vendor WhatsApp Group', status: 'Ready', action: 'Add vendors personally as they sign up.' },
    { item: 'Facebook Page (uTap NMU)', status: 'Active', action: 'Post 3 times during launch week; share to NMU groups.' },
    { item: 'TestFlight / APK Landing Page', status: 'Live', action: 'Ensure mobile-friendly download buttons are working.' },
    { item: 'Vendor Support Videos', status: 'Ready', action: '1-minute "How to accept an order" video shared on WhatsApp.' },
  ]
};

export const phases = [
  {
    number: 1,
    title: 'Internal Testing',
    status: 'done' as const,
    timeframe: 'Complete',
    why: 'Before anyone outside the team uses the app, we need to be sure the core experience works. This phase is about finding and fixing problems in a safe environment — when only we can see them.',
    checklist: [
      'uShop ordering flow tested end-to-end (place order → receive pickup code → vendor confirms)',
      'uGig event flow tested: create an event → student browses → books ticket → ticket verified',
      'Onboarding screen flow refactored to trigger only once',
      'App builds passing on both Android and iOS',
      'TestFlight build created and tested on iOS',
      'APK build created and tested on Android (sideload)',
    ],
    outcome: 'The core shopping and event discovery experience is functional and tested.',
    warning: null,
  },
  {
    number: 2,
    title: 'Alpha: Vendor Founding Collaborators',
    status: 'active' as const,
    timeframe: 'PE Physical Window',
    why: 'Trust is our biggest blocker. Vendors are nervous about where their money goes. We\'re addressing this by being physically present in PE. We aren\'t just selling a tool; we\'re building a partnership.',
    checklist: [
      'Contact the NMU vendor WhatsApp group (via the master/standin contact) and introduce uTap',
      'Identify 5 to 10 vendors who express interest — prioritise foot traffic and trust signals',
      'Schedule one-on-one meeting slots for each vendor during the PE trip',
      'Share the "Where\'s My Money" one-pager with each vendor before arrival — let them read it in their own time',
      'Confirm the SIMA/NMU lecturer contact and schedule class talk slot(s)',
      'Prepare TestFlight invite links and APK download link for student distribution',
      'Print QR code flyers (A6 size — cheap) for vendor counters',
      'Prepare Founding Collaborator certificates (physical, printable)',
    ],
    outcome: 'A confirmed schedule of vendor meetings and class talks before the team lands in PE.',
    warning: 'Do not arrive in PE without pre-scheduled appointments. Cold walking is inefficient and wastes the physical window.',
  },
  {
    number: 3,
    title: 'PE Physical Window — Vendor Onboarding',
    status: 'upcoming' as const,
    timeframe: 'Days 1–3 in PE',
    why: 'Vendor trust is earned in person. Research from our vendor conversations confirmed three specific fears: they do not know us, they have never heard of uTap, and this involves their money. None of these can be resolved via WhatsApp. Physical presence is the only thing that bridges this gap fast enough.',
    checklist: [
      'Day 1: Discovery conversations with each vendor — listen to their current flow, do not pitch yet',
      'Day 1: Perform a live "Money Flow Demo" — show the Yoco integration, show the payout dashboard, show exactly where their money sits',
      'Day 2: Hands-on store setup — photograph menu items, set opening hours, do a live test order from their own phone',
      'Day 2: Show each vendor how to accept an order, issue a pickup code, and check their earnings dashboard',
      'Day 3: Shadow the vendor during a busy period — stand behind the counter and fix anything that goes wrong in real time',
      'Day 3: Set up each vendor on the Founding Vendor WhatsApp group before leaving their stall',
      'Day 3: Hand each vendor their Founding Collaborator certificate',
      'Confirm every vendor has processed at least one successful test order before moving to student recruitment',
    ],
    outcome: '5 to 10 vendors who have processed a real test order, seen the money flow, and have a direct line to the founders.',
    warning: 'Do not open student recruitment until every vendor has completed at least one successful test order. No exceptions.',
  },
  {
    number: 4,
    title: 'PE Physical Window — Student Alpha Recruitment',
    status: 'upcoming' as const,
    timeframe: 'Days 2–4 in PE',
    why: 'Students connect with people they feel a connection to. Lutho\'s experience lecturing is a real advantage here — a class talk from someone who understands student culture converts far better than a poster or a social post. We are capped at 100 to ensure we can support every single one.',
    checklist: [
      'Deliver class talk(s) via SIMA/NMU lecturer contact — hook: "Skip the queue with uShop and never miss a gig with uGig."',
      'Lead with uShop: "Order your lunch before the lecture ends, pick it up without waiting."',
      'Introduce uGig: "Discover the best campus gigs and book your spot instantly."',
      'Distribute TestFlight invite links (iOS) and APK download link (Android) during class talks',
      'Add first students to the Alpha Student WhatsApp group',
      'Set up QR code flyers at all live vendor counters for uShop discovery',
      'Coordinate with NMU SRC via SIMA contact to get app links into society WhatsApp groups',
      'Stop recruitment once 100 students have successfully installed and placed an order — disable signup code',
    ],
    outcome: '100 students who have installed the app and placed their first uShop order or booked a uGig event.',
    warning: 'Cap is 100 students. We need to be able to support every single one of them personally.',
  },
  {
    number: 5,
    title: 'Remote Support Phase — The Pilot Runs',
    status: 'upcoming' as const,
    timeframe: 'Weeks 2–6 (from Joburg)',
    why: 'This is the phase most teams skip — and why most campus app launches die. The team leaves PE and operations collapse. We are explicitly designing for a 4 to 6 week remote support period where vendors keep trading and students keep ordering. This is what turns the Alpha into a pilot with real data.',
    checklist: [
      'Send a daily end-of-day check-in message to the Founding Vendor WhatsApp group: "How were orders today? Any payout issues?"',
      'Monitor Sentry error logs daily from Joburg — fix any critical bugs within 24 hours',
      'Respond to every student bug report in the Alpha WhatsApp group same day',
      'Week 2: First payout cycle — personally confirm every founding vendor received their payout correctly',
      'Week 2: Interview 5 students — what worked, what was confusing?',
      'Week 3: Fix the top 3 most-reported friction points in the uShop flow',
      'Week 4: Review metrics — orders, event bookings, vendor activity',
      'Week 6: Draft NMU Alpha case study with real numbers',
    ],
    outcome: 'Vendors still trading after 6 weeks. Students still ordering. Proof that the remote model works.',
    warning: 'If vendors stop getting order notifications or students stop placing orders, the pilot has failed. Retention is the only metric that matters.',
  },
  {
    number: 6,
    title: 'Alpha: The 100 Student Testers',
    status: 'upcoming' as const,
    timeframe: 'Weeks 2–3',
    why: 'We\'re capping the alpha at 100 students so we can fix things without damaging the brand. This relies on connection—students listen to people they actually know or see.',
    checklist: [
      'Google Play Developer account registered and APK submitted for review',
      'App Store listing updated with NMU-specific screenshots',
      'Physical posters live in every res block common room',
      'Table tents placed at all live vendor counters',
      'SRC briefed and co-posting to NMU student Facebook groups and WhatsApp broadcasts',
      'Blog post: "uTap is live at NMU" published on utaptech.co.za',
      'Founding Student badge campaign live — first 500 registrations',
      'Email 2 sent to Campus Ordering Cheat Sheet subscribers',
    ],
    outcome: '200–300 student installs. Vendors processing real orders daily. First publishable case study numbers.',
    warning: null,
  },
  {
    number: 7,
    title: 'Full Launch + Campus #2 Campaign',
    status: 'upcoming' as const,
    timeframe: 'Weeks 10–14',
    why: 'The NMU data is now what unlocks every future conversation. Campus #2, press, funding, vendor self-serve signups — all of it is easier because we have proof. This phase is about converting NMU momentum into expansion momentum.',
    checklist: [
      'Publish NMU Alpha case study: real numbers, vendor quote, student quote',
      'Open multi-campus waitlist publicly: "Which campus is next?"',
      'Vendor self-serve signup fully public at vendors.utaptech.co.za',
      'Press release to SA tech media: TechCentral, Ventureburn, BusinessTech, ITWeb',
      'Pitch NMU student newspaper and campus radio for a feature story',
      'Begin formal conversations with Campus #2 using NMU data',
    ],
    outcome: '500+ active installs. A publishable case study. First Campus #2 conversation underway.',
    warning: null,
  },
];

export const vendorTrustStrategy = {
  heading: 'Vendor Trust Strategy — The Root Cause',
  rootCause: 'Based on direct conversations with interested NMU vendors, reluctance comes from three specific fears — not price, not features:',
  fears: [
    {
      fear: 'They don\'t know us personally',
      response: 'Physical presence solves this. Lutho and Blessing arriving in person and spending time at their stall is worth more than any pitch deck. The Founding Collaborator framing reinforces it — they are not customers, they are partners who are helping us build.',
    },
    {
      fear: 'They\'ve never heard of uTap',
      response: 'Send the "Where\'s My Money" one-pager before the trip so they have had time to read it. Credibility is built before we arrive, not during the conversation.',
    },
    {
      fear: 'This involves their money',
      response: 'The Live Money Flow Demo is non-negotiable. Show them the Yoco dashboard, show them where the money sits, show them the payout request button. Do not just explain it — show it on a real device in front of them.',
    },
  ],
  foundingCollaboratorPerks: [
    '8% uTap commission waived for first 6 months (Founding Collaborators only)',
    'Direct WhatsApp line to founders — not a support ticket, not a call centre',
    'Physical Founding Collaborator certificate',
    'Priority placement in the uShop listing at NMU',
    'Free menu photography during the PE visit',
  ],
};

export const vendorTargets = [
  { slot: 'Vendor 1', desc: 'The most popular lunch spot on campus — highest daily foot traffic. This vendor gives us volume from day one and signals to other vendors that the most trusted stall chose uTap.', priority: 'Critical' },
  { slot: 'Vendor 2', desc: 'Coffee or drinks vendor — a different order type that tests whether the app handles non-food orders cleanly.', priority: 'Critical' },
  { slot: 'Vendor 3', desc: 'Snacks / tuckshop — covers the between-lecture, quick-purchase use case.', priority: 'High' },
  { slot: 'Vendor 4', desc: 'Evening food vendor — gives us coverage outside lunch hours and tests the after-hours experience.', priority: 'High' },
  { slot: 'Vendor 5', desc: 'Something unique to NMU — a vendor specific to this campus, making the uTap listing feel local and tailored rather than generic.', priority: 'Medium' },
];

export const vendorScript = {
  heading: 'In-person vendor pitch (use this — do not improvise)',
  script: '"We\'re launching a campus ordering app at NMU. We\'re selecting 10 vendors to be Founding Collaborators — meaning you help us build it, and in exchange we waive our commission entirely for the first 6 months. It takes 15 minutes to set up. Students pay you the full menu price and collect with a pickup code. We\'ll be here all week to set everything up with you personally. Want to be one of the first?"',
  whyItWorks: 'This script works because it leads with exclusivity and zero cost, not features. "Founding Collaborator" reframes the conversation from sales to partnership. "We waive our commission" removes the money anxiety. "We\'ll set it up with you personally" removes the technology anxiety. Note: the 8% commission waiver applies to Founding Collaborators only for the first 6 months — be clear about this when they ask what happens after.',
  doNotSay: 'Do not say "zero commission" as a general feature of uTap — it is not. The standard rate is 8%. The waiver is the Founding Collaborator reward. Misrepresenting this will damage trust the moment they read the pricing page.',
};

export const foundingStudent = {
  heading: 'The Founding Student Programme',
  explanation: 'The Founding Student badge is a zero-cost psychological incentive. It gives early adopters a permanent status marker — something that says "I was here first." This matters because people like to be early to things that later become popular. The badge does not unlock any features. It just marks who was first. And because it disappears after 500 students, there is a genuine reason to act quickly.',
  mechanics: [
    'First 500 NMU students to create a uTap account receive a permanent "Founding Student" badge',
    'The badge is displayed on their in-app profile — it never disappears',
    'Once 500 are claimed, the badge is gone forever',
    'No extra features — just the permanent marker of being first',
    'During Alpha, cap is 100. Badge counter shows live progress toward 500 to build FOMO for Beta.',
  ],
  cost: 'R0. Requires one dev flag tracking first 500 sign-ups.',
  insight: 'Early adopter programmes like this consistently outperform discount offers because they appeal to identity ("I\'m someone who finds the best things first") rather than just price.',
};

export const remoteSupport = {
  heading: 'Remote Support Model — After We Leave PE',
  explanation: 'The pilot does not end when we fly back to Joburg. It starts. Everything in PE is setup. The 4 to 6 weeks of remote support is where we find out if the business actually works. This requires a structured, low-burden support model that vendors and students can rely on without the founders being physically present.',
  owner: 'Remote support is owned by Aya from Joburg. Lutho and Blessing are the PE relationship owners. Technical issues escalate to the dev team.',
  vendorSupport: [
    'Founding Vendor WhatsApp group — daily end-of-day check-in message from the team',
    'Pre-recorded video snippets (30 seconds each) recorded during the PE week: "How to accept an order", "How to check your earnings", "How to request a payout"',
    'If a student\'s pickup code fails: vendor gives the food, messages the group immediately, team manually verifies and ensures payout',
    'Payout Week 1: team personally confirms every founding vendor received their first payout — this is the most trust-critical moment after PE',
  ],
  studentSupport: [
    'Alpha Student WhatsApp group — monitored daily, bug reports actioned same day',
    'Simple Google Form for structured feedback (linked in the WhatsApp group pinned message)',
    'Any order failure: direct response within 2 hours during business hours',
  ],
  escalation: 'Critical issues (no orders going through, payouts failing) get same-day fixes. UI tweaks get batched into weekly builds.',
};

export const channels = {
  explanation: 'We\'re using three types of channels: ones we own, ones we rent, and ones we borrow. It\'s important to know the difference because each one has different risks.',
  owned: {
    name: 'Owned Channels',
    explanation: 'Channels we fully control. No algorithm, no platform rule. These grow more effective over time without ongoing cost.',
    items: [
      { name: 'Email list (Cheat Sheet leads)', detail: 'Students who downloaded the Campus Ordering Cheat Sheet are our warmest leads. 5-email sequence converts them to installs — starts at Beta, not Alpha.' },
      { name: 'Blog (utaptech.co.za/blog)', detail: 'Launch announcement post goes live at Beta — not Alpha. Alpha is closed and unannounced publicly.' },
      { name: 'Alpha WhatsApp groups', detail: 'The Founding Vendor group and Alpha Student group are our primary support and feedback channels. These are owned, direct, and high-signal.' },
    ],
  },
  rented: {
    name: 'Rented Channels',
    explanation: 'Platforms we use but do not control. These activate at Beta and Full Launch — not during Alpha.',
    items: [
      { name: 'X / Twitter', detail: 'Founder launch thread goes live at Beta announcement. Not during Alpha.' },
      { name: 'LinkedIn', detail: 'Vendor acquisition and university partnership conversations. Relevant from Beta onwards.' },
      { name: 'Facebook (NMU groups)', detail: 'SRC posts to NMU student groups at Beta launch. High reach, campus-native.' },
      { name: 'App Store / Google Play', detail: 'Public listing goes live at Beta. Alpha uses TestFlight (iOS) and APK sideload (Android).' },
    ],
  },
  borrowed: {
    name: 'Borrowed Channels — Alpha Primary',
    explanation: 'The only channels that matter for Alpha. Personal relationships and trusted networks are faster and more effective than any social post at this scale.',
    items: [
      { name: 'SIMA / NMU Lecturer Contact', detail: 'CRITICAL. Class talks are the single highest-conversion student acquisition channel. A captive room with a trusted third-party endorsing uTap is worth 1,000 impressions online.', priority: 'Critical' },
      { name: 'NMU Vendor WhatsApp Group', detail: 'Pre-existing vendor community. The standin/master contact is the door opener. One message here reaches all interested vendors before we arrive.', priority: 'Critical' },
      { name: 'SRC (Student Representative Council)', detail: 'Build the relationship during Alpha. They co-post the Beta announcement. Do not ask them to do anything during Alpha — just introduce yourself.', priority: 'High' },
      { name: 'Founding Vendors as a Channel', detail: 'Once 5 vendors are live and trust us, their word to other vendors is more powerful than anything we say. Make it easy for them to refer — give them a simple line to use.', priority: 'High' },
    ],
  },
};

export const emailSequence = {
  explanation: 'The email sequence activates at Beta — not Alpha. Alpha is closed. Everyone who downloaded the Campus Ordering Cheat Sheet gets contacted when we open Beta to the broader NMU population.',
  why: 'Email is the most effective conversion channel we have. An email lands in an inbox. A social post competes with everything. Our list is people who already care about saving money on campus food — exactly the problem we solve.',
  emails: [
    { day: 'Immediately', subject: 'Your Campus Ordering Cheat Sheet is here', purpose: 'Delivers the promised PDF. One CTA: download uTap (when available in their region). For non-NMU students: "Register for early access when we come to your campus."' },
    { day: 'Day 3', subject: 'Did you know the café near you takes uTap orders?', purpose: 'First mention that uTap is live at NMU. Warm, conversational. Not a sales email — just a useful update with the app download link.' },
    { day: 'Day 7', subject: 'What a R100 campus meal actually costs (the maths)', purpose: 'The fee breakdown: R100 order → Mr D keeps R27–35 → you get R65–73. uTap: you get R89. Data email reinforcing the why. Links to the full blog post.' },
    { day: 'Day 14', subject: 'The first 500 NMU students get a Founding Student badge', purpose: 'Introduces the Founding Student programme. The FOMO email — creates a reason to act now. "Later" almost always means never.' },
    { day: 'Day 21', subject: 'One more thing before we close early access', purpose: 'Final email. Any real user quotes from Alpha. Final CTA. Also asks "which campus are you at?" — data collection for expansion waitlist.' },
  ],
};

export const launchDaySchedule = [
  { time: 'Day 1 — 08:00', action: 'Vendor Discovery Conversations Begin', detail: 'One-on-one conversations with each pre-scheduled vendor. Listen to their current flow. Do not pitch features — understand their day.' },
  { time: 'Day 1 — 10:00', action: 'Live Money Flow Demo', detail: 'Show each vendor the Yoco integration and payout dashboard on a real device. Walk through: order placed → Yoco processes → ledger updates → payout request. Answer every question about where the money goes.' },
  { time: 'Day 2 — 09:00', action: 'Hands-On Store Setup', detail: 'Photograph menu items. Set up the store listing. Set hours and ordering rules. Do a live test order from the vendor\'s own phone. Do not leave until they have seen money move in the test order.' },
  { time: 'Day 2 — 14:00', action: 'Class Talk #1 — Student Alpha Recruitment', detail: 'Deliver class talk via SIMA contact. Hook: "Skip the queue with uShop and book the best gigs with uGig." Distribute TestFlight links and APK download link.' },
  { time: 'Day 3 — 08:00', action: 'First Live Morning — Vendor Counter Shadowing', detail: 'The first morning rush after recruitment. Stand behind each vendor as the first students try to order. Watch the pickup code flow and fix any technical friction in real time.' },
  { time: 'Day 3 — 12:00', action: 'Class Talk #2 (if needed)', detail: 'Second class talk if needed to hit 100 students. Once reached, stop active recruitment.' },
  { time: 'Day 3 — 17:00', action: 'Vendor Handover + Support Setup', detail: 'Set every vendor up in the WhatsApp group. Show them the support videos. Give them their Founding Collaborator certificate.' },
  { time: 'Day 4–5 — All day', action: 'Support & Troubleshoot', detail: 'Stay available on campus. Fix anything that breaks in the uShop or uGig event flows. Answer every question in person while we still can.' },
  { time: 'Day 5 — Evening', action: 'Debrief + Remote Handover', detail: 'Team debrief. What broke, what surprised us, what needs to be fixed. Remote support model activates from Joburg the next morning.' },
];

export const metrics = [
  { name: 'Student installs (Alpha)', w1: '100', w4: '100', w8: '300+', why: 'Alpha cap is 100. Quality of feedback matters more than volume right now.' },
  { name: 'Active vendors on uShop', w1: '5', w4: '5', w8: '8', why: 'Proof that vendors are actually taking orders without us being there.' },
  { name: 'uShop orders processed', w1: '50', w4: '300', w8: '1,000+', why: '1,000 orders is where the vendor economics become undeniable.' },
  { name: 'uGig events booked', w1: '10', w4: '50', w8: '150', why: 'Measures the success of campus event discovery for students.' },
  { name: 'Founding Vendor retention', w1: '5/5', w4: '5/5', w8: '5/5', why: 'Every founding vendor still active after 6 weeks is a huge win.' },
  { name: 'First payout received', w1: '—', w4: '✓', w8: '✓', why: 'The most trust-critical moment. Every vendor must be paid correctly and on time.' },
  { name: 'Waitlist registrations (Campus #2)', w1: '—', w4: '10', w8: '50+', why: 'Demand signal for expansion.' },
];

export const keyMessage = {
  heading: 'The Main Story',
  explanation: 'We are leading with two things: uShop (saving time) and uGig (finding events). These are the immediate problems we solve for students every day.',
  lead: 'Skip the queue. Never miss a gig.',
  reasoning: [
    'uShop is the hook. Students hate waiting for food. "Order before you leave class" is a clear, immediate win.',
    'uGig is the differentiator. It\'s the only app that puts every campus event—from parties to society meets—in your pocket.',
    'By focusing on shopping and events, we avoid technical friction and focus on the parts of the app that drive daily repeat use.',
  ],
  vendorMessage: 'Lead with the commission waiver. "Keep everything you earn for the first 6 months" is the only thing they need to hear first.',
  rule: 'Student = Skip the queue + Book events. Vendor = Keep 100% of your earnings.',
};

export const teamNote = {
  heading: 'Open questions — needs owner assigned',
  body: 'Every item below is a decision that needs an owner before we set a date for the PE trip. A plan with no owner is a wish list.',
  openQuestions: [
    { q: 'Who owns the SIMA/NMU lecturer relationship and confirms the class talk slots?', owner: 'Lutho' },
    { q: 'Who owns the vendor WhatsApp group contact (the standin/master)?', owner: 'Lutho' },
    { q: 'Who registers the Google Play Developer account ($25 USD)?', owner: 'TBD' },
    { q: 'Who creates the TestFlight build and generates invite links?', owner: 'TBD' },
    { q: 'Who prints the QR code flyers and Founding Collaborator certificates before the trip?', owner: 'TBD' },
    { q: 'Who owns remote support from Joburg during the 4–6 week pilot phase?', owner: 'TBD' },
    { q: 'Who builds the Founding Vendor WhatsApp group and records the support video snippets?', owner: 'Lutho/Blessing (on the ground)' },
    { q: 'What is the realistic trip date — and does it give enough time for pre-trip vendor outreach?', owner: 'All three' },
  ],
  decided: [
    'The product is built and internally tested',
    'NMU is the first campus',
    'Alpha cap: 5–10 vendors, 100 students',
    'Founding Collaborator commission waiver: 8% waived for 6 months for first 10 vendors',
    'Distribution: TestFlight (iOS), APK sideload (Android) for Alpha',
    'We do not recruit students before vendors are live',
    'Remote pilot runs 4–6 weeks after PE trip',
    'Beta (public NMU launch) follows a successful pilot',
  ],
};

export const coordinationTimeline = [
  {
    period: 'Day 1: Trust',
    vendor: 'Discovery & Money Flow Demos (In-person)',
    student: 'Finalise Class Talk slots with lecturers',
    focus: 'Securing the Supply Side',
  },
  {
    period: 'Day 2: Setup',
    vendor: 'Store Setup & Physical Menu Photos',
    student: 'Class Talk #1 (25-50 signups) + uShop/uGig Demo',
    focus: 'Connecting the First 50',
  },
  {
    period: 'Day 3: Live',
    vendor: 'Shadowing morning rush + Fixing friction',
    student: 'Class Talk #2 (Hit 100 cap) + uGig Onboarding',
    focus: 'Testing Under Pressure',
  },
  {
    period: 'Day 4: Support',
    vendor: 'Observing independent trading (Hands-off)',
    student: 'On-ground troubleshooting & feedback collection',
    focus: 'Operational Reality Check',
  },
  {
    period: 'Day 5: Handover',
    vendor: 'WhatsApp group handover + Certificates',
    student: 'Weekly goals announced in Alpha group',
    focus: 'Establishing the Remote Rhythm',
  },
  {
    period: 'Week 2–6: Pilot',
    vendor: 'Daily check-ins (Remote) + First Payout',
    student: 'Continuous bug fixes + Interviewing 5 testers',
    focus: 'Data & Retention',
  },
];
