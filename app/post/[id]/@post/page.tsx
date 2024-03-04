import { MumbleCard } from '@/components/mumble/card/mumble-card';
import { MumblePost } from '@/components/mumble/post/mumble-post';
import { GET_POST_BY_ID } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const post = await GET_POST_BY_ID({ id: params.id });
    return (
      <MumbleCard>
        <MumblePost post={post} variant={MUMBLE_VARIANT.DETAILVIEW} />
      </MumbleCard>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
