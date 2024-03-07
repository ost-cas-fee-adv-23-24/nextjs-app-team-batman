import { cn } from '@/utils/tailwind';
import { ReactNode } from 'react';

export const LayoutTinyUserWrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn(className, 'grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-m')}>{children}</div>;
};
