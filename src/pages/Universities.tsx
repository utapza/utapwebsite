import { ShieldCheck, GraduationCap, Lock } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { images } from '../data/images';

export default function Universities() {
  return (
    <>
      <section className="relative bg-emerald-soft pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="container-page grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              For universities
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
              The student companion app your students will actually open.
            </h1>
            <p className="mt-5 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed">
              uTap is a digital wallet, campus marketplace, and event ticket app built around what students already do every day.
            </p>
            <div className="mt-8">
              <Button as="a" href="mailto:partners@utap.co.za" size="lg">
                Get in touch about partnerships
              </Button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img
              src={images.university}
              alt="A university building"
              className="w-full h-[420px] md:h-[480px] object-cover rounded-[2rem] border border-slate-200 shadow-card-lg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      <Section className="bg-white">
        <SectionHeading
          eyebrow="Why partner"
          title="Real outcomes, not promises"
          subtitle="Three things universities care about, built into the product from day one."
        />
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          <Card>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <GraduationCap size={22} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink">Less plastic.</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              A card students can't lose, backed up to the cloud and restored on a new phone in seconds.
            </p>
          </Card>
          <Card>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink">Faster turnstiles.</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              Fewer lost-card replacements and shorter queues at high-traffic readers.
            </p>
          </Card>
          <Card>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <Lock size={22} aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-ink">Verified vendors.</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              Only campus-affiliated stores list on uTap. No third-party delivery dropshipping into the marketplace.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-emerald-soft">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <SectionHeading
              align="left"
              eyebrow="Privacy"
              title="What students share, what stays with them"
              subtitle="We ask for what we need to make the product work, and nothing more. Student data is never sold."
              className="mb-6"
            />
            <ul className="space-y-3 text-ink-muted">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                <span>Card credentials are encrypted on device. Cloud sync only when the student is signed in.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                <span>Universities receive aggregated, anonymised reporting — no per-student spend data.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                <span>Students can opt out and delete their data at any time.</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-5">
            <Card hover={false} className="bg-white">
              <h3 className="text-lg font-bold text-ink">Want to talk?</h3>
              <p className="mt-2 text-ink-muted">
                We'll set up a 30-minute call with our partnerships lead. No deck, just a conversation about what your campus needs.
              </p>
              <div className="mt-5">
                <Button as="a" href="mailto:partners@utap.co.za" size="md">
                  Email partnerships
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
