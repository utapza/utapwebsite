import { Helmet } from 'react-helmet-async';
import { Section, SectionHeading } from '../../components/ui/Section';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function CompareMrD() {
  return (
    <>
      <Helmet>
        <title>uTap vs Mr D & Uber Eats — The Campus Ordering Comparison</title>
        <meta 
          name="description" 
          content="Comparing uTap to Mr D. See why students prefer uTap's pickup-first, zero-fee campus ordering over expensive delivery apps between lectures." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Compare
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            uTap vs Mr D & Uber Eats
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            General delivery apps are great when you're at home on a Sunday. But when you have 15 minutes between lectures, paying a R40 delivery fee to wait at the boom gate doesn't make sense. Welcome to the pickup-first campus app.
          </p>
        </div>
      </section>

      {/* TL;DR Section */}
      <Section className="bg-white" variant="tight">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-brand-200 border-2">
            <h3 className="text-xl font-bold text-ink">uTap is best for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Everyday campus life. Order your coffee or lunch ahead of time from actual campus stores, skip the queue, and <strong>pick it up yourself</strong>. No delivery fees, no waiting for a driver who can't find your res building. Plus, your app doubles as your student ID.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-ink">Mr D / Uber Eats are best for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Off-campus living and treating yourself to restaurants that aren't on campus. They offer massive variety, but you pay a premium in delivery and service fees for the luxury of staying on your couch.
            </p>
          </Card>
        </div>
      </Section>

      {/* Detailed Comparison */}
      <Section className="bg-emerald-soft">
        <SectionHeading
          align="center"
          title="How they compare"
          subtitle="Honest differences to help you decide."
        />
        <div className="mt-12 overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 rounded-3xl max-w-5xl mx-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="py-4 px-6 text-sm font-semibold text-ink w-1/3">Feature</th>
                <th className="py-4 px-6 text-sm font-bold text-brand-700 w-1/3">uTap</th>
                <th className="py-4 px-6 text-sm font-semibold text-ink w-1/3">Mr D / Uber Eats</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Ordering Model</td>
                <td className="py-4 px-6 text-sm text-ink-muted"><strong>Pickup-first.</strong> Grab it yourself between classes.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Delivery-first. Wait for a driver.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Student Fees</td>
                <td className="py-4 px-6 text-sm text-ink-muted"><strong>Zero.</strong> You pay the menu price.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">High. Delivery fees (R30-R50+) + service fees.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Campus Integration</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Deep. Your app is your NFC student card.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">None. It's just a food app.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Vendor Focus</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Campus cafés, tuckshops, and local university spots.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">National chains and off-campus restaurants.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Vendor Commission</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Transparent 8% — keeps local campus shops alive.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Often up to 30%, eating away small business margins.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Paragraph Comparisons */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-ink">The Cost of Convenience</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              When you're a student, every Rand counts. Ordering a R35 coffee on a general delivery app often turns into a R75 expense once you add the delivery fee and the app service fee. uTap is totally free for students. You order ahead on your phone, pay the exact menu price, and walk to the campus café to pick it up yourself. It saves you money, and it saves you from standing in the queue.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">Campus-Native vs General Delivery</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Have you ever tried getting an Uber Eats driver through the campus boom gates or explaining how to find your specific res block? General delivery apps aren't built for the rhythm of university life. uTap partners directly with the stores that are already on your campus. You're already walking between lectures—you just grab your food on the way.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">Why Campus Vendors Choose uTap</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              For small campus tuckshops and cafés, giving up 30% of their revenue to a delivery app is unsustainable. uTap only charges an 8% platform fee. By pushing a pickup-first model, we help campus vendors handle the massive rush of passing foot traffic efficiently, without destroying their margins. 
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-white" variant="tight">
        <div className="rounded-3xl bg-emerald-gradient p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Stop paying delivery fees on campus.
          </h2>
          <p className="mt-3 text-white/90">
            Skip the queue, tap in, and save your money for the weekend.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/students" variant="dark" size="lg">
              Explore the App
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
