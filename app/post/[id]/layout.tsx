import { LayoutPostWrapper } from '@/components/layout/layout-post-wrapper';
import { ReactNode } from 'react';

export default function Layout({
  post,
  replies,
}: {
  post: ReactNode;
  replies: ReactNode;
  params: { id: string };
  children: ReactNode;
}) {
  return (
    <LayoutPostWrapper className="w-full">
      <div className="grid w-full rounded-m bg-white">
        {post}
        <div className="grid gap-l px-xl pb-l" data-testid="replies-wrapper">
          {replies}
        </div>
      </div>
    </LayoutPostWrapper>
  );
}
