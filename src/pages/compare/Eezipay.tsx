import { Helmet } from 'react-helmet-async';
import { Section, SectionHeading } from '../../components/ui/Section';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function CompareEezipay() {
  return (
    <>
      <Helmet>
        <title>uTap vs Eezipay (Cashless Campus) — Which is better for your campus?</title>
        <meta 
          name="description" 
          content="Comparing uTap and Eezipay. See why students and universities choose uTap for a true one-app campus experience with no student transaction fees." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Compare
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            uTap vs Eezipay
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            Eezipay is a strong cashless payment tool. But if you want a true one-app campus life—where your phone handles your res access, rugby tickets, and morning coffee without charging you fees—uTap is built for you.
          </p>
        </div>
      </section>

      {/* TL;DR Section */}
      <Section className="bg-white" variant="tight">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-brand-200 border-2">
            <h3 className="text-xl font-bold text-ink">uTap is best for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Universities and students who want a unified, modern experience. uTap merges physical access (NFC tap) with a pickup-first marketplace and event ticketing. Crucially, it's <strong>free for students</strong> with no transaction markups.
            </p>
          </Card>
          <Card>
            <h3 className="text-xl font-bold text-ink">Eezipay is best for...</h3>
            <p className="mt-3 text-ink-muted leading-relaxed">
              Schools and institutions that need deep, mature fee-management and parent-oversight controls for younger students. It excels as a pure financial tool for campus wallets.
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
                <th className="py-4 px-6 text-sm font-semibold text-ink w-1/3">Eezipay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Core Focus</td>
                <td className="py-4 px-6 text-sm text-ink-muted">One-app campus life (Access + Marketplace + Events)</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Cashless wallets and tuckshop ordering</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Student Pricing</td>
                <td className="py-4 px-6 text-sm text-ink-muted"><strong>Free.</strong> No transaction fees or monthly subs.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Often includes transaction/subscription fees for schools/parents.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Vendor Experience</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Transparent 8% commission. Predictable Yoco payouts.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Variable payment models depending on the institution.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Physical Access (NFC)</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Native NFC tap for libraries, res, and venues.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Limited. Primarily focused on payments over physical access.</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-medium text-ink">Platform Maturity</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Newer, highly modern mobile-first stack.</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Established, deep fee-management features for schools.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Paragraph Comparisons */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto space-y-12">
          <div>
            <h3 className="text-2xl font-bold text-ink">Pricing: Who actually pays?</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              With many cashless systems, the cost is passed down to students or parents through transaction fees or subscriptions. We built uTap with a different philosophy: it should be completely free for students to use. Our revenue comes from a transparent commission charged to vendors on successful marketplace orders. This means students win on total cost, and vendors get predictable, clear payouts via Yoco without hidden monthly fees.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">The Scope: Payments vs Real Campus Life</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              Eezipay is a fantastic tool if you only need a digital wallet and tuckshop ordering. But university life is more than just paying for coffee. You have to get into your res, scan into the library, and buy tickets for the varsity rugby game. uTap merges your physical student ID with a pickup-first marketplace. One tap in, one tap to order, one tap for the game.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">Where Eezipay Wins</h3>
            <p className="mt-4 text-ink-muted leading-relaxed">
              We'll be honest—if you are a high school looking for deep parent-oversight controls, strict meal-plan budgeting, and mature school-fee management, Eezipay's established system is incredibly robust. uTap's focus is on the independent university student who values a modern, fast, and unified campus app.
            </p>
          </div>
        </div>
      </Section>

      {/* Social Proof & Migration */}
      <Section className="bg-emerald-soft">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-ink">What people say when they switch</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6 text-left">
            <Card hover={false} className="bg-white">
              <p className="text-ink-muted italic">"Finally stopped carrying three cards and queuing for coffee. uTap just works between lectures."</p>
              <p className="mt-4 font-semibold text-ink">— Naledi, First-year Student</p>
            </Card>
            <Card hover={false} className="bg-white">
              <p className="text-ink-muted italic">"Orders come in clean, payouts are on time, and students actually find us. No more WhatsApp chaos."</p>
              <p className="mt-4 font-semibold text-ink">— Sibusiso, Campus Café Owner</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-white" variant="tight">
        <div className="rounded-3xl bg-emerald-gradient p-8 md:p-12 text-white text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Ready to upgrade your campus?
          </h2>
          <p className="mt-3 text-white/90">
            We offer hands-on onboarding for vendors and pilot frameworks for universities.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to="/contact" variant="dark" size="lg">
              Talk to Sales
            </Button>
            <Button as="link" to="/students" variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
              See Student Features
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
