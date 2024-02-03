export default function Layout({ user, posts }: { user: React.ReactNode; posts: React.ReactNode }) {
  return (
    <div className="grid w-full gap-l">
      {user}
      <div className="rounded-m bg-primary-300 p-s">{posts}</div>
    </div>
  );
}
