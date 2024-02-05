import { Card } from '@/components/card/card';
import Post from '@/components/post';
import { GET_POSTS } from '@/utils/api/api-service-post';

export default async function DashboardPosts() {
  // const posts = await GET_POSTS({ query: { likedBy: ['245807989095758678', '245807822799993686'] } });
  const posts = await GET_POSTS();

  return (
    <>
      {/* <LivePosts /> */}

      {posts.data.map((post) => (
        <Card key={post.id}>
          <Post post={post} />
        </Card>
      ))}
    </>
  );
}
