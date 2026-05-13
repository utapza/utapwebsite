import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ease-out-soft ' +
  'active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2';

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-gradient text-white shadow-card-lg hover:shadow-[0_14px_36px_-10px_rgb(5_150_105_/_0.45)] hover:brightness-[1.03]',
  secondary:
    'bg-white text-brand-700 border border-brand-200 hover:border-brand-400 hover:bg-brand-50',
  ghost: 'text-brand-700 hover:bg-brand-50',
  dark: 'bg-ink text-white hover:bg-slate-800',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 px-7 text-base sm:text-lg py-3.5',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  loadingLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsLink = CommonProps & {
  as: 'link';
  to: LinkProps['to'];
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ButtonAsAnchor = CommonProps & {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type Props = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const Spinner = () => (
  <svg
    className="h-4 w-4 animate-spin"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.25"
    />
    <path
      d="M22 12a10 10 0 0 1-10 10"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  props,
  ref,
) {
  const {
    variant = 'primary',
    size = 'md',
    loading,
    loadingLabel,
    leftIcon,
    rightIcon,
    className,
    children,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  const content = (
    <>
      {loading ? <Spinner /> : leftIcon}
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
      {!loading && rightIcon}
    </>
  );

  if (props.as === 'link') {
    return (
      <Link to={props.to} target={props.target} rel={props.rel} onClick={props.onClick} className={classes}>
        {content}
      </Link>
    );
  }

  if (props.as === 'a') {
    return (
      <a href={props.href} target={props.target} rel={props.rel} onClick={props.onClick} className={classes}>
        {content}
      </a>
    );
  }

  const ownProps = new Set([
    'as',
    'variant',
    'size',
    'loading',
    'loadingLabel',
    'leftIcon',
    'rightIcon',
    'className',
    'children',
  ]);
  const buttonProps = props as ButtonAsButton & Record<string, unknown>;
  const rest: ButtonHTMLAttributes<HTMLButtonElement> = {};
  for (const key of Object.keys(buttonProps)) {
    if (!ownProps.has(key)) {
      (rest as Record<string, unknown>)[key] = buttonProps[key];
    }
  }

  return (
    <button
      ref={ref}
      className={classes}
      disabled={buttonProps.disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {content}
    </button>
  );
});
