import React, { useMemo, ComponentType, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { format, parseISO } from 'date-fns';
import { MDXComponents } from '../../components/mdx/MDXComponents';
import { Button } from '../../components/ui/Button';
import { trackEvent } from '../../lib/analytics';

// Dynamic import for individual posts (eager: false means lazy loaded)
const modules = import.meta.glob<{ default: ComponentType<any>, frontmatter: any }>('../../content/blog/*.mdx');
// Need a synchronous index just for frontmatter mapping for the current post
const postsGlob = import.meta.glob<{ frontmatter: any }>('../../content/blog/*.mdx', { eager: true });

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  // Track page view event for analytics instrumentation
  useEffect(() => {
    if (slug) {
      trackEvent('blog_post_viewed', { slug });
    }
  }, [slug]);

  const postMatch = useMemo(() => {
    if (!slug) return null;
    const path = `../../content/blog/${slug}.mdx`;
    if (!modules[path]) return null;
    return {
      path,
      frontmatter: postsGlob[path]?.frontmatter || {},
      importFn: modules[path],
    };
  }, [slug]);

  if (!postMatch || postMatch.frontmatter?.draft) {
    return <Navigate to="/404" replace />;
  }

  // Use React.lazy to dynamically load the MDX component
  const PostContent = useMemo(() => {
    return React.lazy(() => postMatch.importFn());
  }, [postMatch]);

  const { title, excerpt, date, author, image, tags } = postMatch.frontmatter;

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | uTap` : 'Blog | uTap'}</title>
        {excerpt && <meta name="description" content={excerpt} />}
        {/* Open Graph / Social Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        {excerpt && <meta property="og:description" content={excerpt} />}
        {image && <meta property="og:image" content={image} />}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <article className="pb-16 md:pb-24">
        <header className="bg-slate-50 pt-16 pb-12 md:pt-24 md:pb-16 border-b border-slate-100">
          <div className="container-page max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 mb-6 text-sm text-ink-muted font-medium">
              <Link to="/blog" className="hover:text-brand-600 transition-colors">Blog</Link>
              <span>/</span>
              <time dateTime={date}>
                {date ? format(parseISO(date), 'dd MMMM yyyy') : ''}
              </time>
              {tags && tags.length > 0 && (
                <>
                  <span>/</span>
                  <span className="text-brand-600">{tags[0]}</span>
                </>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-6">
              {title}
            </h1>
            
            {excerpt && (
              <p className="text-xl text-ink-muted leading-relaxed mb-8 max-w-2xl mx-auto">
                {excerpt}
              </p>
            )}

            {author && (
              <div className="flex items-center justify-center gap-3 text-sm text-ink-muted">
                <span>By <strong className="text-ink font-medium">{author}</strong></span>
              </div>
            )}
          </div>
        </header>

        <div className="container-page max-w-3xl mt-12 md:mt-16">
          {image && (
            <div className="w-full aspect-[2/1] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 mb-12 border border-slate-100 shadow-sm">
              <img 
                src={image} 
                alt={`Featured image for ${title}`}
                className="w-full h-full object-cover"
                loading="eager" // Hero image should load eagerly
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <React.Suspense fallback={<div className="h-40 flex items-center justify-center animate-pulse text-ink-muted">Loading article...</div>}>
              <PostContent components={MDXComponents} />
            </React.Suspense>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-semibold text-ink mb-1">Share this article</p>
                <p className="text-sm text-ink-muted">Help other students figure it out.</p>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    trackEvent('blog_cta_click', { action: 'copy_link', slug });
                  }}
                >
                  Copy link
                </Button>
                <Button 
                  as="link" 
                  to="/students" 
                  size="sm"
                  onClick={() => trackEvent('blog_cta_click', { action: 'download_app', slug })}
                >
                  Download App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
