import { ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const MDXComponents = {
  h1: (props: any) => (
    <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-ink" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-ink" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl md:text-2xl font-medium mt-6 mb-3 text-ink" {...props} />
  ),
  p: (props: any) => (
    <p className="text-lg leading-relaxed text-ink-muted mb-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-6 text-lg text-ink-muted space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 mb-6 text-lg text-ink-muted space-y-2" {...props} />
  ),
  li: (props: any) => <li {...props} />,
  a: (props: any) => (
    <a className="text-brand-600 hover:text-brand-700 underline underline-offset-2" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-brand-200 pl-4 italic text-ink-muted my-6" {...props} />
  ),
  img: ({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
    return (
      <span className="block my-8">
        <img
          src={src}
          alt={alt || ''}
          loading="lazy"
          className={cn(
            'w-full max-h-[500px] object-cover rounded-2xl shadow-sm border border-slate-100',
            props.className
          )}
          {...props}
        />
        {alt && (
          <span className="block text-center text-sm text-slate-500 mt-2">
            {alt}
          </span>
        )}
      </span>
    );
  },
  strong: (props: any) => <strong className="font-semibold text-ink" {...props} />,
  hr: () => <hr className="my-8 border-slate-100" />,
};
