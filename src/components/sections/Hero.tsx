import { Lock, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { images } from '../../data/images';

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-emerald-soft pt-24 md:pt-32 pb-16 md:pb-24"
    >
      {/* Background ornament */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-32 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div className="relative left-1/2 aspect-[1155/678] w-[60rem] -translate-x-1/2 opacity-30 bg-emerald-gradient" />
      </div>

      <div className="container-page grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/70 backdrop-blur px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Built for South African campuses
          </div>

          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Tap in. <span className="text-brand-600">Order up.</span> Show up.
          </h1>

          <p className="mt-5 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed">
            Your student card on your phone. Campus food, books, and gear from
            trusted vendors. Tickets for games and events. One app.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button as="link" to="/students" size="lg">
              Download uTap
            </Button>
            <Button as="a" href="https://vendors.utaptech.co.za" variant="secondary" size="lg">
              Open a store
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
            <li className="inline-flex items-center gap-2">
              <Smartphone size={16} className="text-brand-600" aria-hidden="true" />
              South African campuses
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-brand-600" aria-hidden="true" />
              Payments by Yoco
            </li>
            <li className="inline-flex items-center gap-2">
              <Lock size={16} className="text-brand-600" aria-hidden="true" />
              Encrypted on device
            </li>
          </ul>
        </div>

        <div className="lg:col-span-5 animate-fade-up [animation-delay:80ms]">
          <PhoneMockup imageUrl={images.heroPrimary} />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 rounded-[3rem] bg-emerald-gradient opacity-20 blur-2xl" aria-hidden="true" />
      <div className="relative rounded-[2.5rem] border border-slate-200 bg-white shadow-card-lg overflow-hidden">
        <img
          src={imageUrl}
          alt="A student tapping their phone at a campus terminal"
          loading="eager"
          className="block w-full h-[520px] object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        {/* Foreground floating card */}
        <div className="pointer-events-none absolute left-4 right-4 bottom-4 rounded-2xl bg-white/90 backdrop-blur p-4 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Student card
          </p>
          <p className="mt-1 text-lg font-bold text-ink">Tap to enter</p>
          <p className="text-sm text-ink-muted">
            Library · Residence · Turnstile
          </p>
        </div>
      </div>
    </div>
  );
}
