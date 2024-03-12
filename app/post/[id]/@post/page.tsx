import { MumbleCard } from '@/components/mumble/card/mumble-card';
import { MumblePost } from '@/components/mumble/post/mumble-post';
import { GET_POST_BY_ID } from '@/utils/api/api-actions-post';
import { ULID_SCHEMA } from '@/utils/api/api-helpers';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { errorHandler } from '@/utils/helpers/error-handler';
import { notFound } from 'next/navigation';
import { tagReplacement } from '@/utils/helpers/tags-replacement';

export default async function Page({ params }: { params: { id: string } }) {
  if (!ULID_SCHEMA.safeParse(params.id).success) {
    return notFound();
  }

  try {
    const post = await GET_POST_BY_ID({ id: params.id });
    if (post) {
      return (
        <MumbleCard imageSrc={post.creator?.avatarUrl ?? undefined}>
          <MumblePost post={tagReplacement(post)!} variant={MUMBLE_VARIANT.DETAILVIEW} />
        </MumbleCard>
      );
    }
  } catch (error) {
    errorHandler(error);
  }
}
