import { Button } from '../ui/Button';
import { images } from '../../data/images';

export function VendorStrip() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-page">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-3xl bg-emerald-gradient opacity-15 blur-2xl"
                aria-hidden="true"
              />
              <img
                src={images.vendor}
                alt="A campus café owner working at her counter"
                loading="lazy"
                className="relative w-full h-72 md:h-96 object-cover rounded-2xl border border-slate-100 shadow-card"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              For vendors
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
              Run a store on campus? Open it on uTap.
            </h2>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed">
              Take orders from students before they walk past, with payouts you can plan around.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Button as="link" to="/vendors" size="lg">
                Open my store
              </Button>
              <Button as="link" to="/pricing" variant="ghost" size="lg">
                See pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
