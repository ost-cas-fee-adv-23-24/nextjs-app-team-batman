import { ReactNode, Suspense } from 'react';

export default function Layout({ user, posts }: { user: ReactNode; posts: ReactNode }) {
  return (
    <div className="grid w-full gap-l">
      <div>
        <Suspense fallback={<p>LOADING USER...</p>}>{user}</Suspense>
      </div>
      <div>{posts}</div>
    </div>
  );
}
