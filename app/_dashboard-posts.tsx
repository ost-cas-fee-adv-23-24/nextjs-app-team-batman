import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import { MumbleCard } from '@/components/mumble/mumble-card';
import { MumblePost } from '@/components/mumble/mumble-post';
import { MUMBLE_USER_INFO_VARIANT } from '@/components/mumble/mumble-user-info';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { delay } from '@/utils/delay';
import { MumbleInfinityPosts } from '../components/mumble/mumble-infinity-posts';

export const DashboardPosts = async () => {
  const posts = await Promise.all([GET_POSTS({ query: { limit: MUMBLE_POSTS_PAGINATION } }), delay()]).then(
    (results) => results[0],
  );

  return (
    <>
      {/* <LivePosts /> */}

      {posts.data.map((post) => (
        <MumbleCard imageSrc={post.creator?.avatarUrl ?? undefined} key={post.id} post={post}>
          <MumblePost post={post} variant={MUMBLE_USER_INFO_VARIANT.TIMELINE} />
        </MumbleCard>
      ))}

      {posts.count > 10 && <MumbleInfinityPosts olderThan={posts.data[0].id} limit={MUMBLE_POSTS_PAGINATION} />}
    </>
  );
};
