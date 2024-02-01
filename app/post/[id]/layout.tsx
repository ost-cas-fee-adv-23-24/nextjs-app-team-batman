import { Card } from '@/components/card/card';

export default function Layout({ postitem, replies }: { postitem: React.ReactNode; replies: React.ReactNode }) {
  return (
    <Card>
      {postitem}
      {replies}
    </Card>
  );
}
