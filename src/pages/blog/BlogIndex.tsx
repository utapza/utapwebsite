import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format, parseISO } from 'date-fns';
import { Button } from '../../components/ui/Button';

// Get all MDX files synchronously so we have access to their exported frontmatter
const postsGlob = import.meta.glob<{ frontmatter: any }>('../../content/blog/*.mdx', { eager: true });

export default function BlogIndex() {
  const posts = useMemo(() => {
    return Object.entries(postsGlob)
      .map(([path, module]) => {
        const slug = path.split('/').pop()?.replace('.mdx', '') || '';
        return {
          slug,
          ...module.frontmatter,
        };
      })
      .filter((post) => post.title) // filter out invalid posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  return (
    <>
      <Helmet>
        <title>Insights & News | uTap</title>
        <meta name="description" content="Read the latest updates, guides, and stories from uTap. Your campus, on your phone." />
      </Helmet>

      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="container-page max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-4">
            Insights & News
          </h1>
          <p className="text-xl text-ink-muted">
            Updates, guides, and stories about campus commerce and student life.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page max-w-4xl">
          <div className="grid gap-12">
            {posts.map((post) => (
              <article key={post.slug} className="group relative flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {post.image && (
                  <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-center py-2">
                  <div className="flex items-center gap-3 mb-3 text-sm text-ink-muted">
                    <time dateTime={post.date}>
                      {post.date ? format(parseISO(post.date), 'dd MMM yyyy') : 'Unknown date'}
                    </time>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span>·</span>
                        <span className="text-brand-600 font-medium">{post.tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-ink mb-3 group-hover:text-brand-600 transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-lg text-ink-muted mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-brand-600 font-medium group-hover:text-brand-700 transition-colors">
                    Read article
                    <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      →
                    </span>
                  </div>
                </div>
              </article>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-12 text-ink-muted">
                No posts published yet. Check back soon.
              </div>
            )}
          </div>

          <div className="mt-20 p-8 md:p-12 bg-brand-50 rounded-3xl text-center">
            <h3 className="text-2xl font-semibold text-ink mb-3">Ready to tap into your day?</h3>
            <p className="text-lg text-ink-muted mb-6">Download uTap and see what's happening on your campus.</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button as="link" to="/students">Download uTap</Button>
              <Button as="a" href="https://vendors.utaptech.co.za" variant="secondary">Open a store</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
