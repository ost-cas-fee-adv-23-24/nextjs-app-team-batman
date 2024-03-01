import { ReactNode } from 'react';

export default function Layout({
  post,
  reply,
  replies,
}: {
  post: ReactNode;
  reply: ReactNode;
  replies: ReactNode;
  params: { id: string };
  children: ReactNode;
}) {
  return (
    <div className="grid w-full rounded-m bg-white">
      {post}
      <div className="grid gap-l px-xl pb-l">
        {reply}
        {replies}
      </div>
    </div>
  );
}
