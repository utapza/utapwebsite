import { Helmet } from 'react-helmet-async';
import { Section, SectionHeading } from '../../components/ui/Section';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function CompareCartZA() {
  return (
    <>
      <Helmet>
        <title>uTap vs CartZA — The Integrated Campus App Comparison</title>
        <meta 
          name="description" 
          content="Comparing uTap to CartZA. See why students are switching to uTap for the full campus stack: NFC ID, Marketplace, and Event Tickets in one app." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Compare
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            uTap vs CartZA
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            CartZA is great for ordering a burger between classes. But campus life is more than just lunch. uTap puts your student ID, your wallet, your tickets, and your marketplace in one tap.
          </p>
        </div>
      </section>

      {/* TL;DR Section */}
      <Section className="bg-white" variant="tight">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-brand-200 border-2">
            <h3 className="text-xl font-bold text-ink">uTap is best for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              The "One App" student experience. uTap handles your <strong>digital student ID (NFC)</strong>, campus orders, and event tickets. It's the full utility stack for navigating university life daily.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-ink">CartZA is best for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Pure-play food ordering. If you only want to order food ahead and don't care about your student card or campus events, CartZA is a solid, student-built option for your cafeteria run.
            </p>
          </Card>
        </div>
      </Section>

      {/* Detailed Comparison Table */}
      <Section className="bg-emerald-soft">
        <SectionHeading
          align="center"
          title="At a glance"
          subtitle="How the two stacks stack up."
        />
        <div className="mt-12 overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 rounded-3xl max-w-5xl mx-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="py-4 px-6 text-sm font-semibold text-ink w-1/3">Feature</th>
                <th className="py-4 px-6 text-sm font-bold text-brand-700 w-1/3">uTap</th>
                <th className="py-4 px-6 text-sm font-semibold text-ink w-1/3">CartZA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Student ID (NFC)</td>
                <td className="py-4 px-6 text-sm text-ink-muted">✅ <strong>Built-in.</strong> Scan once, carry digitally.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">❌ Not supported.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Campus Ordering</td>
                <td className="py-4 px-6 text-sm text-ink-muted">✅ uShop (Full marketplace)</td>
                <td className="py-4 px-6 text-sm text-ink-muted">✅ Focus on food & queue-skipping.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Marketplace Breadth</td>
                <td className="py-4 px-6 text-sm text-ink-muted"><strong>Multi-category.</strong> Food, books, electronics, tickets, and stationery.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Food-only focus.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Events & Tickets</td>
                <td className="py-4 px-6 text-sm text-ink-muted">✅ uGig (Varsity sports, society gigs)</td>
                <td className="py-4 px-6 text-sm text-ink-muted">❌ Not supported.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Vendor Analytics</td>
                <td className="py-4 px-6 text-sm text-ink-muted">✅ Deep insights + payout tracking.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">⚠️ Basic order management.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Student Verification</td>
                <td className="py-4 px-6 text-sm text-ink-muted">✅ <strong>NFC-Verified.</strong> Actual university ID integration.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">⚠️ Unverified. Geographic restriction only.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Vendor Tooling</td>
                <td className="py-4 px-6 text-sm text-ink-muted">✅ <strong>Pro Dashboards.</strong> Analytics, payouts, & inventory.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">❌ Limited. Coordination-only.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Availability</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Expanding nationwide (Pilot at NMU).</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Geographic lock (Primarily UFS/Bloemfontein).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Differentiator Sections */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-ink">More than just lunch: A complete marketplace</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              While CartZA focuses exclusively on food ordering, uTap is a full-service campus marketplace. Whether you need a <strong>replacement laptop charger</strong>, a <strong>textbook for your next module</strong>, or just a <strong>coffee between lectures</strong>, uTap connects you with every type of vendor on your campus. It's one app for everything you need to buy during the day.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">Identity-Native: The Full Stack</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Ever lost your paper ticket for a varsity game or a society gig? uTap's <strong>uGig</strong> feature brings campus events into the same ecosystem. Discover what's happening on your campus, buy your ticket in two taps, and show your code at the door. It's one less thing to worry about.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">Verified Campus vs Geographic Intermediary</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Research into campus ordering apps reveals a major difference in how they verify students. While some platforms rely on simple geographic "zones" (often locking you to a specific city like Bloemfontein), uTap uses actual <strong>NFC student ID verification</strong>. This ensures that every transaction is campus-native and institutionally verified. We've built a professional commerce infrastructure with reliable UX—not just a coordination layer for delivery.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">For Vendors: More Than a Coordination Tool</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              uTap provides campus vendors with a sophisticated dashboard that handles more than just orders. While some platforms leave vendors to operate independently with little digital support, uTap offers <strong>automated payouts (on the 28th)</strong>, deep customer analytics, and inventory management. We help you run your business, not just manage your queue.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-white" variant="tight">
        <div className="rounded-3xl bg-emerald-gradient p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            The only campus app you'll ever need.
          </h2>
          <p className="mt-3 text-white/90">
            One app. One tap. Your whole campus life, sorted.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/students" variant="dark" size="lg">
              Get Started for Free
            </Button>
            <Button as="link" to="/vendors" variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
              I'm a Campus Vendor
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
