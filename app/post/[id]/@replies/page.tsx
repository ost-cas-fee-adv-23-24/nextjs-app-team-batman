import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumbleCreate } from '@/components/mumble/create/mumble-create';
import { MumblePost } from '@/components/mumble/post/mumble-post';
import { MumbleUserInfo } from '@/components/mumble/user/mumble-user-info';
import { GET_POST_REPLIES } from '@/utils/api/api-actions-post';
import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { ULID_SCHEMA } from '@/utils/api/api-helpers';
import { MUMBLE_TYPE, MUMBLE_VARIANT } from '@/utils/enums';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  if (!ULID_SCHEMA.safeParse(params.id).success) {
    return notFound();
  }

  const replies = await GET_POST_REPLIES({ id: params.id });
  const session = await auth();
  const user = session?.user?.id && (await GET_USER_BY_ID({ id: session.user.id }));

  return (
    <>
      {session && user && (
        <div className="grid gap-s" data-testid="create-reply-wrapper">
          <div className="flex">
            <MumbleUserInfo variant={MUMBLE_VARIANT.REPLY} user={user} />
          </div>
          <MumbleCreate type={MUMBLE_TYPE.REPLY} parentId={params.id} />
        </div>
      )}

      {replies.count === 0 ? (
        <div className="rounded-s bg-base-100 p-xs text-base-500" data-testid="no-replies">
          🤔 hmm... hier wurde noch nichts kommentiert
        </div>
      ) : (
        replies.data.map((post) => <MumblePost post={post} key={post.id} variant={MUMBLE_VARIANT.REPLY} />)
      )}
    </>
  );
}
