import { Helmet } from 'react-helmet-async';
import { Section, SectionHeading } from '../../components/ui/Section';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function CompareVarsityVibe() {
  return (
    <>
      <Helmet>
        <title>uTap vs Varsity Vibe — Action vs Discovery on Campus</title>
        <meta 
          name="description" 
          content="Comparing uTap to Varsity Vibe. Understand the difference between finding discount codes and actually powering your physical campus life." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Compare
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            uTap vs Varsity Vibe
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            Varsity Vibe is a fantastic app for finding a discount at the mall. But when you're actually on campus, you need an app that lets you scan into your res, order from the tuckshop, and buy rugby tickets. 
          </p>
        </div>
      </section>

      {/* TL;DR Section */}
      <Section className="bg-white" variant="tight">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-brand-200 border-2">
            <h3 className="text-xl font-bold text-ink">uTap is built for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Action. uTap is a digital wallet, an NFC student card, and a marketplace. You use it to physically enter buildings, skip the coffee queue by ordering ahead, and buy event tickets directly from your university.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-ink">Varsity Vibe is built for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Discovery. It is a directory of discount codes for national retailers and fast food chains. You check it before you go shopping to see if you can save 20%.
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
                <th className="py-4 px-6 text-sm font-semibold text-ink w-1/3">Varsity Vibe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Core Function</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Transactional (Ordering, Payments, Access)</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Discovery (Finding discount codes)</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Campus Integration</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Deep. Integrates with uni hardware and local tuckshops.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">None. Focuses on national off-campus brands.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Physical Access (NFC)</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Yes. Replaces your plastic student card.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">No physical access capabilities.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Student Pricing</td>
                <td className="py-4 px-6 text-sm text-ink-muted"><strong>Free.</strong></td>
                <td className="py-4 px-6 text-sm text-ink-muted"><strong>Free.</strong> (Often includes premium tiers).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Paragraph Comparisons */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-ink">Two completely different tools</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              We'll be honest: uTap isn't trying to replace Varsity Vibe. If you want 20% off at Cotton On, you should definitely use Varsity Vibe. But when you are standing outside the university library trying to tap in, or you have exactly four minutes to grab a coffee between lectures, a discount directory app isn't going to help you. That's where uTap lives.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">The Rhythm of Campus Life</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              uTap focuses exclusively on the micro-transactions of student life. We partner with the small campus cafés, the res committees, and the university administration to make the daily friction of being a student disappear. We're not a marketing platform for global brands; we're the operating system for your physical campus.
            </p>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-white" variant="tight">
        <div className="rounded-3xl bg-emerald-gradient p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready for a smarter campus?
          </h2>
          <p className="mt-3 text-white/90">
            Get the app that actually gets you into class and gets you fed.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/students" variant="dark" size="lg">
              Download uTap
            </Button>
            <Button as="link" to="/universities" variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
              For Universities
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
