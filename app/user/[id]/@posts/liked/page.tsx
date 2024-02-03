import Post from '@/components/post';
import { APIError } from '@/utils/api/api-service-base';
import { GET_POSTS } from '@/utils/api/api-service-post';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const userPosts = await GET_POSTS({ query: { likedBy: [params.id] } });

    return (
      <div className="overflow-auto">
        {userPosts.data.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      return notFound();
    }
    throw error;
  }
}
