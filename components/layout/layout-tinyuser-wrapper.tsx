import { cn } from '@/utils/tailwind';
import { ReactNode } from 'react';

export const LayoutTinyUserWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn(className, 'sm:grid-cols-auto grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-m')}>
      {children}
    </div>
  );
};
