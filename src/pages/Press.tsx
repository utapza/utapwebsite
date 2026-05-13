import { Download } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Press() {
  return (
    <>
      <section className="bg-emerald-soft pt-20 md:pt-28 pb-12 md:pb-16">
        <div className="container-page max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Press
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.05]">
            Press kit.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-ink-muted leading-relaxed">
            Logos, screenshots, and the short version of who we are.
          </p>
        </div>
      </section>

      <Section className="bg-white" variant="tight">
        <div className="grid md:grid-cols-2 gap-6">
          <Card hover={false}>
            <h3 className="text-xl font-bold text-ink">Brand assets</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              Logo lockups in SVG and PNG. Light and dark variants. Coming soon — for now, email{' '}
              <a href="mailto:press@utap.co.za" className="font-semibold text-brand-700 hover:underline">
                press@utap.co.za
              </a>
              .
            </p>
            <div className="mt-5">
              <Button as="a" href="mailto:press@utap.co.za?subject=uTap%20brand%20assets" variant="secondary" leftIcon={<Download size={16} />}>
                Request the zip
              </Button>
            </div>
          </Card>
          <Card hover={false}>
            <h3 className="text-xl font-bold text-ink">About uTap (boilerplate)</h3>
            <p className="mt-2 text-ink-muted leading-relaxed">
              uTap is the campus app for South African students. Your student card lives on your phone — tap into buildings, libraries, and residences. Order food, books, and gear from trusted campus vendors and skip the queue. Grab tickets for varsity games and campus events on the same screen. Vendors get a simple way to take orders and get paid. One app, one tap, the day moves quicker.
            </p>
          </Card>
        </div>
      </Section>

      <Section className="bg-emerald-soft" variant="tight">
        <Card hover={false} className="!p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-ink">Press enquiries</h3>
          <p className="mt-2 text-ink-muted">
            We aim to reply within one working day.
          </p>
          <div className="mt-5">
            <Button as="a" href="mailto:press@utap.co.za">
              press@utap.co.za
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
