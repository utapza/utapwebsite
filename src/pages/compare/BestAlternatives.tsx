import { Helmet } from 'react-helmet-async';
import { Section, SectionHeading } from '../../components/ui/Section';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function BestAlternatives() {
  const alternatives = [
    {
      name: "uTap",
      best_for: "The 'All-in-One' Campus Stack",
      pros: ["NFC Student ID built-in", "Multi-category Marketplace (Food, Gear, Books)", "Event Ticketing (uGig)", "Zero markup for students"],
      cons: ["Newer platform (Pilot phase)"],
      cta: "/students"
    },
    {
      name: "CartZA",
      best_for: "Pure Food Ordering",
      pros: ["Student-built brand", "Focused on queue skipping", "Easy mobile ordering"],
      cons: ["Geographic lock (Bloemfontein/UFS)", "No actual student verification", "No vendor portal or analytics"],
      cta: "https://cart.co.za"
    },
    {
      name: "Varsity Vibe",
      best_for: "National Retail Discounts",
      pros: ["Massive brand network", "Proven savings at retailers", "Long-standing trust"],
      cons: ["R200/year membership fee", "No in-app commerce", "Passive discounts only"],
      cta: "https://varsityvibe.co.za"
    },
    {
      name: "SnapScan",
      best_for: "Cashless Payments Only",
      pros: ["Widely accepted", "Reliable payment rail", "Trusted brand"],
      cons: ["No ordering/discovery layer", "No campus-specific features", "No student ID utility"],
      cta: "https://snapscan.co.za"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Best Campus Apps in South Africa — 2026 Comparison</title>
        <meta 
          name="description" 
          content="Comparing the best student apps in South Africa. From digital student IDs to food ordering and retail discounts — find the right app for your campus life." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Best student apps for campus life (2026)
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            University life is messy. Between forgotten student cards, long cafeteria queues, and overpriced delivery fees, you've got enough to worry about. We've compared the top campus apps in South Africa to help you stay sorted.
          </p>
        </div>
      </section>

      {/* Criteria Section */}
      <Section className="bg-white" variant="tight">
        <SectionHeading
          title="What to look for"
          subtitle="Don't just download every app. Look for these four things."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            { title: "Utility", desc: "Does it replace a physical card or handle an essential task?" },
            { title: "Cost", desc: "Are there membership fees or hidden delivery markups?" },
            { title: "Integration", desc: "Does it work with the vendors actually on your campus?" },
            { title: "Security", desc: "Is your data and payment information encrypted?" }
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-ink">{item.title}</h4>
              <p className="mt-2 text-sm text-ink-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* List of Alternatives */}
      <Section className="bg-emerald-soft">
        <div className="max-w-5xl mx-auto space-y-8">
          {alternatives.map((alt, i) => (
            <Card key={i} className={`p-8 md:p-10 ${i === 0 ? 'border-brand-300 border-2 ring-4 ring-brand-50' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  {i === 0 && (
                    <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 mb-4">
                      Our Recommendation
                    </span>
                  )}
                  <h3 className="text-3xl font-extrabold text-ink">{alt.name}</h3>
                  <p className="text-brand-600 font-semibold mt-1">Best for: {alt.best_for}</p>
                </div>
                <div>
                  <Button 
                    as={alt.cta.startsWith('/') ? 'link' : 'a'} 
                    to={alt.cta.startsWith('/') ? alt.cta : undefined} 
                    href={!alt.cta.startsWith('/') ? alt.cta : undefined}
                    variant={i === 0 ? 'dark' : 'outline'}
                    size="lg"
                  >
                    {i === 0 ? 'Explore uTap' : `Visit ${alt.name}`}
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-10 pt-10 border-t border-slate-100">
                <div>
                  <h4 className="font-bold text-ink uppercase text-xs tracking-wider">The Wins</h4>
                  <ul className="mt-4 space-y-2">
                    {alt.pros.map((pro, j) => (
                      <li key={j} className="flex items-center text-sm text-ink-muted">
                        <span className="text-emerald-500 mr-2">✓</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-ink uppercase text-xs tracking-wider">The Trade-offs</h4>
                  <ul className="mt-4 space-y-2">
                    {alt.cons.map((con, j) => (
                      <li key={j} className="flex items-center text-sm text-ink-muted">
                        <span className="text-amber-500 mr-2">!</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Comparison Summary Table */}
      <Section className="bg-white">
        <SectionHeading
          align="center"
          title="Summary comparison"
          subtitle="A quick breakdown of the top contenders."
        />
        <div className="mt-12 overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 rounded-3xl max-w-5xl mx-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead>
              <tr className="bg-slate-50">
                <th className="py-4 px-6 text-sm font-semibold text-ink">App</th>
                <th className="py-4 px-6 text-sm font-semibold text-ink">Primary Use</th>
                <th className="py-4 px-6 text-sm font-semibold text-ink">NFC Student ID</th>
                <th className="py-4 px-6 text-sm font-semibold text-ink">Student Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-4 px-6 text-sm font-bold text-brand-700">uTap</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Wallet + Orders + Tickets</td>
                <td className="py-4 px-6 text-sm text-ink-muted font-semibold text-emerald-600">✅ Yes</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Free</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-bold text-ink">CartZA</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Food Ordering</td>
                <td className="py-4 px-6 text-sm text-ink-muted">❌ No</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Free</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-bold text-ink">Varsity Vibe</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Retail Discounts</td>
                <td className="py-4 px-6 text-sm text-ink-muted">❌ No</td>
                <td className="py-4 px-6 text-sm text-ink-muted">R200/year</td>
              </tr>
              <tr>
                <td className="py-4 px-6 text-sm font-bold text-ink">SnapScan</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Payments</td>
                <td className="py-4 px-6 text-sm text-ink-muted">❌ No</td>
                <td className="py-4 px-6 text-sm text-ink-muted">Free</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Final Recommendation */}
      <Section className="bg-white" variant="tight">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-ink tracking-tight">The Verdict</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">
            If you just want retail discounts, <strong>Varsity Vibe</strong> is the gold standard. If you just want to pay at a till without a card, <strong>SnapScan</strong> is your best bet. 
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed font-bold">
            But if you want a single app that replaces your physical student card, lets you order campus food without delivery fees, and gives you access to varsity events—uTap is the only platform built for the full campus stack.
          </p>
          <div className="mt-8">
            <Button as="link" to="/students" variant="dark" size="lg">
              Get uTap for Free
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
