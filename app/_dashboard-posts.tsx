import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import { MumbleCard } from '@/components/mumble/card/mumble-card';
import { MumblePost } from '@/components/mumble/post/mumble-post';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { MumbleInfinityPosts } from '../components/mumble/post/mumble-infinity-posts';
import { tagReplacement } from '@/utils/helpers/tags-replacement';

export const DashboardPosts = async () => {
  const posts = await Promise.all([GET_POSTS({ query: { limit: MUMBLE_POSTS_PAGINATION } }), delay()]).then(
    (results) => results[0],
  );
  return (
    <>
      {/* <LivePosts /> */}

      {posts.data.map((post) => (
        <MumbleCard imageSrc={post.creator?.avatarUrl ?? undefined} key={post.id} post={post}>
          <MumblePost post={tagReplacement(post)!} variant={MUMBLE_VARIANT.TIMELINE} />
        </MumbleCard>
      ))}

      {posts.count > 10 && <MumbleInfinityPosts olderThan={posts.data[0].id} limit={MUMBLE_POSTS_PAGINATION} />}
    </>
  );
};
