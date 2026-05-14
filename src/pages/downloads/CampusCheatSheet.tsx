import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../../components/ui/Button';

export default function CampusCheatSheet() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch('/.netlify/functions/send-cheat-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Download: The Campus Ordering Cheat Sheet — uTap</title>
        <meta
          name="description"
          content="See the real cost of ordering on Mr D vs uTap. One page. Free download. South African students save R600+ a month switching to pickup-first ordering."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Free Download
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Stop paying R85 extra<br className="hidden sm:block" /> every time you order food.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-2xl mx-auto">
            We did the maths. A R100 campus meal on Mr D or Uber Eats costs you up to{' '}
            <strong>R185 when you add up all the fees</strong>. On uTap? Still R100.
            Get the one-page breakdown — free.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-page max-w-5xl grid md:grid-cols-2 gap-12 items-start">

          {/* What's inside */}
          <div>
            <h2 className="text-2xl font-bold text-ink">What's inside</h2>
            <ul className="mt-6 space-y-4 text-ink-muted">
              {[
                'Side-by-side fee breakdown: R100 meal on Mr D vs uTap',
                'How much SA students waste per month on delivery fees (it\'s a lot)',
                'The 3 uTap rules for ordering smarter on campus',
                'Free vs Premium plan comparison — so you know exactly what you get',
                '3-step quick start guide for your first pickup order',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ink-muted">
              One page. Takes 2 minutes to read. No spam — unsubscribe any time.
            </p>
          </div>

          {/* Form */}
          <div className="bg-slate-50 rounded-3xl p-8 ring-1 ring-slate-200">
            {submitted ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">📬</div>
                <h3 className="text-xl font-bold text-ink">Check your inbox!</h3>
                <p className="mt-2 text-ink-muted">
                  We've sent the cheat sheet to <strong>{email}</strong>.
                </p>
                <p className="mt-6 text-ink-muted text-sm">
                  While you wait — download uTap and place your first order.
                </p>
                <div className="mt-4">
                  <Button as="link" to="/students" variant="primary" size="lg">
                    Get the App →
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-ink">Get the free cheat sheet</h2>
                  <p className="mt-1 text-sm text-ink-muted">Enter your email and we'll send it right now.</p>
                </div>
                <div>
                  <label htmlFor="cheatsheet-email" className="block text-sm font-medium text-ink mb-1">
                    Your email address
                  </label>
                  <input
                    id="cheatsheet-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.ac.za"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send me the cheat sheet →'}
                </Button>
                <p className="text-xs text-center text-slate-400">
                  No spam. No subscription. Just the PDF.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="bg-emerald-soft py-10">
        <div className="container-page max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 mb-6">
            What students say after switching
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left text-sm">
            {[
              { quote: '"I didn\'t realise I was spending R900 a month on delivery fees. That\'s textbooks money."', name: 'Kemi, 2nd year, UCT' },
              { quote: '"Ordered before my lecture ended. Coffee was ready when I walked past the café. Never going back."', name: 'Luca, 3rd year, UP' },
              { quote: '"The free plan does everything I need. No hidden fees ever."', name: 'Aisha, 1st year, Wits' },
            ].map(({ quote, name }) => (
              <div key={name} className="bg-white rounded-2xl p-5 ring-1 ring-slate-100">
                <p className="text-ink-muted italic">{quote}</p>
                <p className="mt-3 font-semibold text-ink text-xs">— {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
