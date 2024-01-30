import { cn } from '@/lib/utils';

interface Props extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export function Section({ children, className = '' }: Props) {
  return (
    <section className={cn('space-y-12 text-left', className)}>
      {children}
    </section>
  );
}

function Header({ children, className = '', ...props }: Props) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {children}
    </div>
  );
}

function Content({ children, className = '', ...props }: Props) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

Section.Header = Header;
Section.Content = Content;
