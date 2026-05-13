import { Section, SectionHeading } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { team } from '../data/team';
import { images } from '../data/images';

const antiPromises = [
  "We won't sell student data.",
  "We won't run delivery fees on a R\u202f30 toastie.",
  "We won't add features just because the calendar says it's a sprint.",
  "We won't promise more than we can pay.",
];

export default function About() {
  return (
    <>
      <section className="relative bg-emerald-soft pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="container-page max-w-4xl">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            About uTap
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            We built uTap because campus shouldn't be this much friction.
          </h1>
          <div className="mt-6 space-y-4 text-lg text-ink-muted leading-relaxed">
            <p>
              uTap started with a student who forgot their card and missed an exam. The fix shouldn't be queuing at admin or paying for a replacement — it should be a tap on a phone they already carry.
            </p>
            <p>
              We're a small South African team building one thing: a campus app students will actually open. Tap in, order up, show up. Everything else is a distraction.
            </p>
            <p>
              We're not a delivery company. We're not a bank. We're a student utility that takes three friction points off your day.
            </p>
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="The team"
          title="Who's behind it"
          subtitle="Four people. Real names. Real bios."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {team.map((m) => (
            <Card key={m.name} className="!p-0 overflow-hidden flex flex-col">
              <div className="aspect-[4/5] w-full overflow-hidden bg-slate-100">
                <img
                  src={m.image}
                  alt={`${m.name}, ${m.role}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 ease-out-soft hover:scale-[1.02]"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-ink">{m.name}</h3>
                <p className="text-sm font-semibold text-brand-700">{m.role}</p>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed">{m.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-emerald-soft">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="What we won't do"
              title="Anti-promises"
              subtitle="Saying what we're not is half the brand."
              className="mb-0"
            />
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-3">
              {antiPromises.map((promise) => (
                <li
                  key={promise}
                  className="flex gap-3 rounded-2xl bg-white border border-slate-100 px-5 py-4 text-ink shadow-card"
                >
                  <span
                    className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500"
                    aria-hidden="true"
                  />
                  <span className="font-medium">{promise}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
              Want to chat?
            </h2>
            <p className="mt-3 text-ink-muted leading-relaxed">
              We try to reply within one working day. Press, partnerships, vendor questions, or just to say hi.
            </p>
            <div className="mt-6">
              <Button as="link" to="/contact" size="lg">
                Get in touch
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={images.about}
              alt="The uTap team working"
              loading="lazy"
              className="w-full h-72 md:h-96 object-cover rounded-2xl border border-slate-100 shadow-card"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
