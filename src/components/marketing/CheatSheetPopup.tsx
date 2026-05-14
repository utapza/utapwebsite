import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

/**
 * Exit-intent / timed popup promoting the Campus Ordering Cheat Sheet.
 * Triggers on mouse leaving the viewport (exit intent) or after 30s.
 * Submits to the Netlify function that emails the PDF via Resend.
 */
export function CheatSheetPopup() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 30_000);
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed) setVisible(true);
    };
    document.addEventListener('mouseleave', onMouseOut);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseOut);
    };
  }, [dismissed]);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
  };

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
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div
      id="cheatsheet-popup-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && handleDismiss()}
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <button
          onClick={handleDismiss}
          aria-label="Close popup"
          className="absolute top-4 right-4 text-slate-400 hover:text-ink text-xl font-bold leading-none"
        >
          ✕
        </button>

        {sent ? (
          <div className="text-center py-2">
            <div className="text-4xl mb-3">📬</div>
            <h3 className="text-lg font-bold text-ink">On its way!</h3>
            <p className="mt-2 text-sm text-ink-muted">Check your inbox for the cheat sheet.</p>
            <button onClick={handleDismiss} className="mt-5 text-sm font-semibold text-brand-700 hover:underline">
              Continue reading →
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-2">Free Download</p>
            <h3 className="text-xl font-bold text-ink leading-snug">
              See exactly how much you're overpaying on every campus order.
            </h3>
            <p className="mt-2 text-sm text-ink-muted">
              Get the one-page Campus Ordering Cheat Sheet — the full fee breakdown, free.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                id="popup-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@university.ac.za"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send me the free cheat sheet →'}
              </Button>
            </form>
            <p className="mt-3 text-xs text-center text-slate-400">No spam. No subscription. Just the PDF.</p>
          </>
        )}
      </div>
    </div>
  );
}
