import { MUMBLE_USER_INFO_VARIANT, MumblePost } from '@/components/mumble';
import { MumbleCard } from '@/components/mumble/mumble-card';
import { GET_POSTS } from '@/utils/api/api-actions-post';

export const DashboardPosts = async () => {
  // const posts = await GET_POSTS({ query: { likedBy: ['245807989095758678', '245807822799993686'] } });
  const posts = await GET_POSTS();

  return (
    <>
      {/* <LivePosts /> */}

      {posts.data.map((post) => (
        <MumbleCard key={post.id}>
          <MumblePost post={post} variant={MUMBLE_USER_INFO_VARIANT.TIMELINE} />
        </MumbleCard>
      ))}
    </>
  );
};
