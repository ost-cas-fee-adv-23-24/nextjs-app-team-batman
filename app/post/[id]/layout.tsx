import { Card } from '@/components/card/card';

export default function Layout({
  post,
  reply,
  replies,
}: {
  post: React.ReactNode;
  reply: React.ReactNode;
  replies: React.ReactNode;
}) {
  return (
    <Card>
      <div className="grid gap-l">
        {post}
        {reply}
        {replies}
      </div>
    </Card>
  );
}
