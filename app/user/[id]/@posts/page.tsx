import { MUMBLE_USER_INFO_VARIANT, MumblePost } from '@/components/mumble';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const userPosts = await GET_POSTS({ query: { creators: [params.id] } });

    return (
      <div className="overflow-auto">
        {userPosts.data.map((post) => (
          <MumblePost post={post} key={post.id} variant={MUMBLE_USER_INFO_VARIANT.TIMELINE} />
        ))}
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();

    throw error;
  }
}
