import { cn } from '@/utils/tailwind';
import { HTMLAttributes } from 'react';

function Skeleton({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mumble-animate-skeleton', className)} {...props}>
      {children ?? <>&nbsp;</>}
    </div>
  );
}

export { Skeleton };
