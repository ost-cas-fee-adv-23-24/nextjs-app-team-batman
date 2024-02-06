import { MumbleCard } from '@/components/mumble';
import { ReactNode } from 'react';

export default function Layout({ post, reply, replies }: { post: ReactNode; reply: ReactNode; replies: ReactNode }) {
  return (
    <MumbleCard>
      <div className="grid gap-l">
        {post}
        {reply}
        {replies}
      </div>
    </MumbleCard>
  );
}
