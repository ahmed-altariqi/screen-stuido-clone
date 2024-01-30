import { cn } from '@/lib/utils';

interface TypographyVariantProps
  extends React.HTMLProps<HTMLHeadingElement | HTMLParagraphElement> {}

const VARIANTS = {
  h1: ({ className = '', ...props }: TypographyVariantProps) => (
    <h1
      className={cn('text-3xl font-bold tracking-wide md:text-6xl', className)}
      {...props}
    />
  ),
  h2: ({ className = '', ...props }: TypographyVariantProps) => (
    <h2
      className={cn('text-3xl font-bold tracking-wide md:text-5xl', className)}
      {...props}
    />
  ),
  h3: ({ className = '', ...props }: TypographyVariantProps) => (
    <h3
      className={cn('text-2xl font-bold tracking-wide md:text-5xl', className)}
      {...props}
    />
  ),
  p: ({ className = '', ...props }: TypographyVariantProps) => (
    <p
      className={cn(
        'max-w-[49ch] text-[18px] font-light tracking-wide opacity-55',
        className,
      )}
      {...props}
    />
  ),
};

type TypographyProps = {
  as: keyof typeof VARIANTS;
} & TypographyVariantProps;

export function Typography({ as, ...props }: TypographyProps) {
  const Comp = VARIANTS[as];

  if (!Comp) return null;

  return <Comp {...props} />;
}
