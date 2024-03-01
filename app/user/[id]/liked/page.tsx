import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import { MUMBLE_USER_INFO_VARIANT, MumbleCard, MumblePost } from '@/components/mumble';
import { MumbleInfinityPosts } from '@/components/mumble/mumble-infinity-posts';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const userPosts = await GET_POSTS({ query: { likedBy: [params.id], limit: MUMBLE_POSTS_PAGINATION } });

    return (
      <div className="grid gap-s">
        {userPosts.data.map((post) => (
          <MumbleCard key={post.id} imageSrc={post.creator?.avatarUrl ?? undefined}>
            <MumblePost post={post} key={post.id} variant={MUMBLE_USER_INFO_VARIANT.TIMELINE} />
          </MumbleCard>
        ))}
        {userPosts.count > MUMBLE_POSTS_PAGINATION && (
          <MumbleInfinityPosts olderThan={userPosts.data[0].id} limit={MUMBLE_POSTS_PAGINATION} likedBy={[params.id]} />
        )}
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
