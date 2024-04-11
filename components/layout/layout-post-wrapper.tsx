import { cn } from '@/utils/tailwind';
import { ReactNode } from 'react';

export const LayoutPostWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn(className, 'grid gap-s pl-s md:pl-0')} data-testid="post-wrapper">
      {children}
    </div>
  );
};
