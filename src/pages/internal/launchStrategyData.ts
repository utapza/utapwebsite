export const intro = {
  whatIs: {
    heading: 'First — what is a launch strategy, and why does it matter?',
    body: [
      'A launch strategy is a structured plan that answers one question: how do we get the right people to start using uTap at NMU, in the right order, without wasting effort or momentum?',
      'Without a launch strategy, teams tend to do everything at once, or nothing at all. They post once on social media, get a few downloads, and then wonder why it "didn\'t work." The reason is almost always the same: launching is a process, not an event.',
      'A good launch strategy gives your team clarity on who does what, in what order, and why. It makes sure we don\'t burn our best opportunities too early (like announcing to the full campus before a single vendor is ready to receive orders). And it creates a shared reference point so everyone — even if they have different roles — understands where we are and what comes next.',
      'This document is a proposal. It is not final. We will discuss it as a team, add what\'s missing, and agree on the version we execute. But we need a starting point — and this is it.',
    ],
  },
  whyNow: {
    heading: 'Why the NMU launch is the most important thing we do this year',
    body: [
      'NMU is not just our first campus — it is our proof of concept. Every future campus conversation starts with: "Show me that it worked somewhere first." NMU is that somewhere.',
      'If we execute this launch well, we walk into the next campus negotiation with data: X students installed, Y vendors are live, Z orders were processed. Those numbers turn a pitch into a case study. They are the difference between someone saying "interesting idea" and "when can we start?"',
      'If we rush the launch and students download the app to find no vendors, or tap their card and get an error, we lose trust we cannot easily rebuild. First impressions on a campus spread fast — a bad one spreads faster than a good one.',
      'The goal of this launch is not speed. It is quality. We want the first 100 students to have a great experience, so they tell the next 400.',
    ],
  },
};

export const phases = [
  {
    number: 1,
    title: 'Internal Testing',
    status: 'done' as const,
    timeframe: 'Complete',
    why: 'Before anyone outside the team uses the app, we need to be sure the core experience works. This phase is about finding and fixing problems in a safe environment — when only we can see them.',
    what: [
      'NFC card scanning tested across multiple card types',
      'uShop ordering flow tested end-to-end (place order → receive pickup code → vendor confirms)',
      'Onboarding screen flow refactored to trigger only once and handle navigation correctly',
      'App builds passing on both Android and iOS',
    ],
    outcome: 'The core experience — card on phone, order campus food, collect with a code — is functional and tested.',
    warning: null,
  },
  {
    number: 2,
    title: 'Vendor Seeding',
    status: 'active' as const,
    timeframe: 'Weeks 1–2',
    why: 'This is the most important phase that most teams skip — and the reason most marketplace apps fail at launch. If students open uTap and there are no vendors to order from, they close the app and never come back. We must have real, live vendors ready before we invite a single student.',
    what: [
      'Identify the 5 best NMU campus vendors to approach first (see vendor targets below)',
      'Visit each vendor in person — do the 15-minute setup walk-through with them',
      'Place a test order at each vendor before going live',
      'Give each vendor a printed card with their uShop QR code and pickup code instructions',
      'Brief vendors on what to expect: "Students will order ahead and show you a 4-digit code. Confirm the code, prepare the order, hand it over."',
      'Create a WhatsApp group with all 5 vendors for quick communication during launch week',
    ],
    outcome: '5 live, tested vendors on uShop before we announce to students.',
    warning: 'Do not skip this phase or compress it. If we launch to students with zero vendors, the launch fails.',
  },
  {
    number: 3,
    title: 'Student Beta',
    status: 'upcoming' as const,
    timeframe: 'Weeks 2–3',
    why: 'A beta is a small, controlled group of real users who test the app before the public launch. The purpose is not marketing — it is learning. Beta users find the problems that internal testing misses, because they use the app differently to how the team uses it.',
    what: [
      'Recruit 50–100 students directly via SRC contacts, class reps, and personal networks',
      'Offer a "first order free" incentive — coordinate with one vendor to absorb a R30–R50 voucher',
      'Watch the onboarding analytics: where are people dropping off during the card scan?',
      'Ask beta users one simple question via WhatsApp: "What didn\'t work?" Not "did you like it?"',
      'Fix the top 3 problems before opening to the wider campus',
    ],
    outcome: 'A working app that 50+ real students have used, with the most obvious friction points removed.',
    warning: 'Keep this group small and personal. The goal is feedback, not numbers.',
  },
  {
    number: 4,
    title: 'Early Access Launch',
    status: 'upcoming' as const,
    timeframe: 'Weeks 3–4',
    why: 'Early access is the moment the product becomes public — but with a frame of exclusivity. Instead of saying "uTap is now live," we say "be one of the first 500 students on campus to get founding access." The content is the same. The framing is different. And framing matters enormously for how people perceive and share something.',
    what: [
      'Physical posters in every res block common room — QR code to App Store / Google Play',
      'Table tents at every live vendor: "Order ahead on uTap — skip the queue"',
      'SRC posts the announcement to all NMU student Facebook groups and WhatsApp broadcasts',
      'Blog post: "uTap is live at NMU" published on utaptech.co.za',
      'Founder X thread telling the NMU launch story',
      'LinkedIn post for vendors and university audiences',
      'Email 2 sent to everyone who downloaded the Campus Ordering Cheat Sheet',
    ],
    outcome: '200–300 student installs. Vendors processing real orders daily.',
    warning: null,
  },
  {
    number: 5,
    title: 'Full Launch + Expansion Campaign',
    status: 'upcoming' as const,
    timeframe: 'Weeks 6–8',
    why: 'The full launch is when we stop calling it "early access" and open the door completely. But more importantly, this is when we use the NMU data to start the conversation with Campus #2. Every campus after NMU gets easier — because we have proof.',
    what: [
      'Publish the NMU pilot case study: real numbers, real vendor and student quotes',
      'Open the multi-campus waitlist publicly: "Which campus is next? Register your interest."',
      'Vendor self-serve signup goes fully public (vendors.utaptech.co.za)',
      'Press release distributed to SA tech media: TechCentral, Ventureburn, BusinessTech, ITWeb',
      'Pitch to NMU student newspaper and campus radio for a feature story',
      'Begin formal conversations with Campus #2 using NMU data as the pitch',
    ],
    outcome: '500+ active installs. A publishable case study. The first conversation with Campus #2 underway.',
    warning: null,
  },
];

export const vendorTargets = [
  { slot: 'Vendor 1', desc: 'The most popular lunch spot on campus — highest daily foot traffic. This vendor gives us volume from day one.', priority: 'Critical' },
  { slot: 'Vendor 2', desc: 'Coffee or drinks vendor — a different order type, tests whether the app handles non-food orders cleanly.', priority: 'Critical' },
  { slot: 'Vendor 3', desc: 'Snacks / tuckshop — covers the between-lecture, quick-purchase use case.', priority: 'High' },
  { slot: 'Vendor 4', desc: 'Evening food vendor — gives us coverage outside lunch hours and tests the after-hours experience.', priority: 'High' },
  { slot: 'Vendor 5', desc: 'Something unique to NMU — a vendor that is specific to this campus, which makes the uTap listing feel local and tailored.', priority: 'Medium' },
];

export const vendorScript = {
  heading: 'In-person vendor pitch (use this word for word)',
  script: '"We\'re launching a campus ordering app at NMU. It takes 15 minutes to set up. You list for free. We don\'t take a commission on orders — you keep what you earn. Students pay you the menu price and collect their order with a pickup code. Want to try it before we open to all students?"',
  whyItWorks: 'This script works because it leads with what vendors care about most — margins. "Free to list" and "zero commission" are the two words that open the door. The pickup code explanation removes the mystery. The "before we open to all students" framing gives them exclusivity and a reason to act now.',
};

export const foundingStudent = {
  heading: 'The Founding Student Programme',
  explanation: 'The Founding Student badge is a zero-cost psychological incentive. It gives early adopters a permanent status marker — something that says "I was here first." This matters because people like to be early to things that later become popular. The badge does not unlock any features. It just marks who was first. And because it disappears after 500 students, there is a genuine reason to act quickly.',
  mechanics: [
    'First 500 NMU students to create a uTap account receive a "Founding Student" badge',
    'The badge is permanently displayed on their in-app profile — it never disappears',
    'Once 500 are claimed, the badge is gone forever',
    'No extra features — just the permanent marker of being first',
  ],
  cost: 'R0. This requires only a development flag to track the first 500 sign-ups.',
  insight: 'Early adopter programmes like this consistently outperform discount offers because they appeal to identity ("I\'m someone who finds the best things first") rather than just price.',
};

export const channels = {
  explanation: 'Our channels are split into three types — Owned, Rented, and Borrowed. Understanding the difference is important because each type has different risks and different roles in the launch.',
  owned: {
    name: 'Owned Channels',
    explanation: 'Channels we fully control. No algorithm, no platform rule, no pay-to-play. These are our most valuable long-term assets because they get more effective over time without ongoing cost.',
    items: [
      { name: 'Email list', detail: 'Students who downloaded the Campus Ordering Cheat Sheet have already shown interest in saving money on campus food. These are our warmest leads. A 5-email sequence converts them to app installs.' },
      { name: 'Blog (utaptech.co.za/blog)', detail: 'The launch announcement post and future NMU case study live here permanently. Unlike a social post, a blog post keeps working for months via search traffic.' },
      { name: 'In-app push notifications', detail: 'After install, we send 3 onboarding messages at Day 1, Day 3, and Day 7 to guide new users to their first card scan and first order.' },
      { name: 'WhatsApp broadcast', detail: 'On-campus, WhatsApp is the highest-open-rate channel available to us. The beta student group becomes our first broadcast list.' },
    ],
  },
  rented: {
    name: 'Rented Channels',
    explanation: 'Platforms we use but do not control. Algorithm changes, account suspensions, or pay-to-play requirements can reduce our reach at any time. We use these to drive traffic to owned channels, not as a destination.',
    items: [
      { name: 'X / Twitter', detail: 'Best for the founder launch thread and data-driven takes on campus food economics. Students and SA tech communities are active here.' },
      { name: 'LinkedIn', detail: 'Best for vendor acquisition, university partnership conversations, and press attention. Not for student-facing content.' },
      { name: 'Facebook (NMU groups)', detail: 'NMU students are active in campus Facebook groups. The SRC can post here on our behalf for immediate reach.' },
      { name: 'App Store / Google Play', detail: 'Students searching "campus app" or "NMU" need to find us. ASO (App Store Optimisation) is a low-effort, high-return investment.' },
    ],
  },
  borrowed: {
    name: 'Borrowed Channels',
    explanation: 'Reaching students through someone else\'s established audience. This is how we get reach we haven\'t earned yet. The key is to make it genuinely worth their while — we are asking for access to their audience, which is valuable.',
    items: [
      { name: 'SRC (Student Representative Council)', detail: 'CRITICAL. The SRC has direct access to the entire NMU student body via group chats, notice boards, and events. A single SRC co-post reaches more students than anything we can do ourselves.', priority: 'Critical' },
      { name: 'NMU student newspaper / Varsity Radio', detail: 'Student media wants stories that are relevant to students. "New app puts your student card on your phone and removes delivery fees" is exactly that story. Approach them for an exclusive before the launch announcement.', priority: 'Critical' },
      { name: 'NMU student content creators (Instagram / TikTok)', detail: 'Students trust other students. A creator with 2,000 campus followers has more credibility with those followers than any marketing we produce. Offer free Premium access in exchange for an honest review.', priority: 'High' },
      { name: 'SA tech press (TechCentral, Ventureburn, BusinessTech)', detail: 'Important for the vendor acquisition story and future campus partnership conversations. Press coverage gives institutional credibility.', priority: 'High' },
    ],
  },
};

export const emailSequence = {
  explanation: 'Everyone who downloaded the Campus Ordering Cheat Sheet gave us their email address because they are interested in spending less money on campus food. That is exactly the problem uTap solves. The email sequence is how we convert that interest into an app install — over 21 days, in 5 emails.',
  why: 'Email is the most effective marketing channel that exists. Not because it is flashy — it is not. Because it is personal and direct. An email lands in someone\'s inbox. A social post competes with everything else in a feed. We should treat our email list as our most valuable asset.',
  emails: [
    { day: 'Immediately', subject: 'Your Campus Ordering Cheat Sheet is here', purpose: 'Deliver the promised PDF. One clear CTA: download uTap. This email must deliver exactly what was promised — trust starts here.' },
    { day: 'Day 3', subject: 'Did you know the café near you takes uTap orders?', purpose: 'First mention that uTap is live at NMU. Warm, conversational. Not a sales email — just a useful update. Includes the app download link and a link to register early access for other campuses.' },
    { day: 'Day 7', subject: 'What a R100 campus meal actually costs (the maths)', purpose: 'The fee breakdown from our blog post, condensed into an email. This is the data email — it reinforces the "why" behind downloading uTap. Links to the full blog post for those who want more.' },
    { day: 'Day 14', subject: 'The first 500 NMU students get a Founding Student badge', purpose: 'Introduces the Founding Student programme. This is the FOMO email — it creates a reason to act now rather than "later." Later almost always means never.' },
    { day: 'Day 21', subject: 'One more thing before we close early access', purpose: 'Final email. Includes any social proof gathered from real users (even one genuine quote helps). Final CTA to download. Also asks "which campus are you at?" — this gives us data for the expansion waitlist.' },
  ],
};

export const launchDaySchedule = [
  { time: '07:00', action: 'Blog post goes live', detail: '"uTap is live at NMU" — written, SEO-optimised, and scheduled in advance. This is the source of truth that all other posts link back to.' },
  { time: '07:30', action: 'Founder X thread', detail: 'The personal launch story. Why we built this. What is live today. Honest about what is not finished yet. This is our most shareable content.' },
  { time: '08:00', action: 'LinkedIn post', detail: 'Professional framing for vendors and university audiences. Link goes in the first comment to avoid the LinkedIn algorithm penalty for external links in the post body.' },
  { time: '08:30', action: 'SRC posts to all NMU student groups', detail: 'This is our highest-reach moment of the day. The SRC co-post to NMU Facebook groups and WhatsApp broadcasts reaches the full student body. Brief them the day before so they are ready.' },
  { time: '09:00', action: 'Email 2 to cheat sheet subscribers', detail: 'The warmest leads we have get a personal email announcing we are live. These are the students most likely to install first.' },
  { time: '10:00', action: 'Physical posters go up on campus', detail: 'Every res block common room, near every vendor, and at high-foot-traffic points. QR code that deep-links to the App Store / Google Play listing.' },
  { time: '12:00', action: 'Table tents placed at all 5 live vendors', detail: '"Order ahead on uTap — skip the queue." Students ordering lunch see this at the moment they are most motivated to try it.' },
  { time: 'All day', action: 'Personal responses to every comment, DM, and message', detail: 'On launch day, no comment goes unanswered. Every person who engages gets a personal reply from the team. This is the single highest-leverage use of our time on launch day.' },
  { time: '18:00', action: 'Day 1 recap post on X', detail: '"Day 1 is live. Here is what happened." Real numbers if we have them. Honest if we don\'t. Building in public creates trust.' },
];

export const metrics = [
  { name: 'Student installs', w1: '100', w4: '300', w8: '500+', why: 'This is the primary growth metric. 500 active installs in 60 days is enough to constitute a credible campus launch and support the case study for Campus #2.' },
  { name: 'Active vendors on uShop', w1: '3', w4: '5', w8: '8', why: 'Vendor count drives student value. More vendors = more reasons to open the app. 5 at launch is the minimum viable marketplace.' },
  { name: 'Orders processed', w1: '50', w4: '300', w8: '1,000+', why: '1,000 orders is the threshold where vendor economics become undeniable. It generates enough data for a compelling case study.' },
  { name: 'NFC card scans', w1: '80', w4: '250', w8: '450', why: 'Card scans measure genuine engagement — students who completed the core product experience, not just installed the app.' },
  { name: 'Email → install conversion', w1: '—', w4: '15%', w8: '20%', why: 'Our email list is our most qualified audience. 20% conversion means 1 in 5 people who downloaded our cheat sheet become active users.' },
  { name: 'Campus #2 waitlist registrations', w1: '—', w4: '10', w8: '50+', why: 'Expansion velocity. 50 registrations from other campuses during the NMU launch proves demand beyond NMU before we have spent a cent on the next campus.' },
];

export const keyMessage = {
  heading: 'The single most important messaging decision',
  explanation: 'There are two stories we could lead with when talking to students: the food ordering story ("order campus food without delivery fees") or the card story ("your student card lives on your phone"). Both are true. Both are valuable. But they are not equal.',
  lead: 'Lead with the card. Always.',
  reasoning: [
    'Every NMU student has a student card. Not every NMU student orders food via an app.',
    'The card is a daily necessity. Forgetting it disrupts your entire day. Delivery fees are an irritant. Losing your card is a crisis.',
    'Once a student scans their card into uTap, the food ordering and events features are already there — no additional decision needed.',
    'The card story is also a differentiation story. No other app does this. Every food ordering competitor can be described as "cheaper food." No competitor can be described as "your student card on your phone."',
  ],
  vendorMessage: 'For vendors, lead with the commission. "You keep your margin" is the only thing a vendor needs to hear first.',
  rule: 'Student = card first. Vendor = commission first. Never mix the two audiences\' messages.',
};

export const teamNote = {
  heading: 'A note on why this document exists',
  body: 'This proposal exists so we can have a productive conversation rather than a blank-page meeting. Every item in this document is a decision that needs to be made before we launch. Some of these decisions are already made (the app is built, NMU is the first campus). Others are still open (which 5 vendors do we approach first? Who owns the SRC relationship? Who is on the ground putting up posters?). The purpose of our team discussion is to assign ownership to every action item and agree on a realistic timeline. A plan with no owner is just a wish list.',
};
