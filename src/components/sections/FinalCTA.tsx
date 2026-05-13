import { Button } from '../ui/Button';

export function FinalCTA({
  title = 'Less wallet. More campus.',
  body = 'Download uTap and tap into your day.',
  primary = { to: '/students', label: 'Download uTap' },
  secondary = { to: '/vendors', label: 'Are you a vendor?' },
}: {
  title?: string;
  body?: string;
  primary?: { to: string; label: string };
  secondary?: { to: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-emerald-gradient" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-10 mix-blend-soft-light"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 0, transparent 35%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.5) 0, transparent 30%)',
        }}
      />
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-white/90">{body}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button as="link" to={primary.to} variant="dark" size="lg">
              {primary.label}
            </Button>
            <Button as="link" to={secondary.to} variant="ghost" size="lg" className="!text-white hover:!bg-white/10">
              {secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
