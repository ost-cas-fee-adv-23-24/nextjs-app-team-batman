import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumbleCreate } from '@/components/mumble/mumble-create';
import { MumbleReply } from '@/components/mumble/mumble-reply';
import { MUMBLE_USER_INFO_VARIANT, MumbleUserInfo } from '@/components/mumble/mumble-user-info';
import { GET_POST_REPLIES } from '@/utils/api/api-actions-post';
import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { MUMBLE_TYPE } from '@/utils/api/api-types';

export default async function Page({ params }: { params: { id: string } }) {
  const replies = await GET_POST_REPLIES({ id: params.id });
  const session = await auth();
  const user = session?.user?.id && (await GET_USER_BY_ID({ id: session.user.id }));

  return (
    <>
      {session && user && (
        <div className="grid gap-s">
          <MumbleUserInfo variant={MUMBLE_USER_INFO_VARIANT.REPLY} user={user} />
          <MumbleCreate type={MUMBLE_TYPE.REPLY} parentId={params.id} />
        </div>
      )}

      {replies.count === 0 ? (
        <div className="rounded-s bg-base-100 p-xs text-base-500">🤔 hmm... hier wurde noch nichts kommentiert</div>
      ) : (
        replies.data.map((post) => <MumbleReply post={post} key={post.id} />)
      )}
    </>
  );
}
