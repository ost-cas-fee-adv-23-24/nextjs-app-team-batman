import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import { LayoutPostWrapper } from '@/components/layout/layout-post-wrapper';
import { MumbleCard } from '@/components/mumble/card/mumble-card';
import { MumbleInfinityPosts } from '@/components/mumble/post/mumble-infinity-posts';
import { MumblePost } from '@/components/mumble/post/mumble-post';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const userPosts = await Promise.all([
      GET_POSTS({ query: { creators: [params.id], limit: MUMBLE_POSTS_PAGINATION } }),
      delay(),
    ]).then((results) => results[0]);

    return (
      <LayoutPostWrapper>
        {userPosts.data.map((post) => (
          <MumbleCard key={post.id} imageSrc={post.creator?.avatarUrl ?? undefined} post={post}>
            <MumblePost post={post} key={post.id} variant={MUMBLE_VARIANT.TIMELINE} />
          </MumbleCard>
        ))}
        {userPosts.count > MUMBLE_POSTS_PAGINATION && (
          <MumbleInfinityPosts
            olderThan={userPosts.data[0].id}
            limit={MUMBLE_POSTS_PAGINATION}
            creators={[params.id]}
          />
        )}
      </LayoutPostWrapper>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
