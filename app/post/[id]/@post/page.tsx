import { MUMBLE_USER_INFO_VARIANT, MumblePost } from '@/components/mumble';
import { GET_POST_BY_ID } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const post = await GET_POST_BY_ID({ id: params.id });

    return (
      <div>
        <MumblePost post={post} variant={MUMBLE_USER_INFO_VARIANT.DETAILVIEW} />
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
