import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center bg-emerald-soft">
      <div className="container-page max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          404
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink">
          That page is off campus.
        </h1>
        <p className="mt-5 text-lg text-ink-muted">
          We couldn't find what you were looking for. Try one of these:
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button as="link" to="/" size="lg">
            Go home
          </Button>
          <Button as="link" to="/students" variant="secondary" size="lg">
            For students
          </Button>
          <Button as="link" to="/vendors" variant="ghost" size="lg">
            For vendors
          </Button>
        </div>
      </div>
    </section>
  );
}
