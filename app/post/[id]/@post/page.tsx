import { MumbleCard } from '@/components/mumble/mumble-card';
import { MumblePost } from '@/components/mumble/mumble-post';
import { MUMBLE_USER_INFO_VARIANT } from '@/components/mumble/mumble-user-info';
import { GET_POST_BY_ID } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const post = await GET_POST_BY_ID({ id: params.id });
    return (
      <MumbleCard>
        <MumblePost post={post} variant={MUMBLE_USER_INFO_VARIANT.DETAILVIEW} />
      </MumbleCard>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
