import { Suspense } from 'react';

export default function Layout({ user, posts }: { user: React.ReactNode; posts: React.ReactNode }) {
  return (
    <div className="grid w-full gap-l">
      <Suspense fallback={<p>LOADING USER...</p>}>{user}</Suspense>
      <div className="rounded-m bg-primary-300 p-s">{posts}</div>
    </div>
  );
}
