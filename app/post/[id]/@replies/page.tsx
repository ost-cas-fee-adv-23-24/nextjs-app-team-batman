import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MUMBLE_USER_INFO_VARIANT, MumbleCreate, MumbleReply, MumbleUserInfo } from '@/components/mumble';
import { GET_POST_REPLIES } from '@/utils/api/api-actions-post';
import { MUMBLE_TYPE } from '@/utils/api/api-types';

export default async function Page({ params }: { params: { id: string } }) {
  const replies = await GET_POST_REPLIES({ id: params.id });
  const session = await auth();

  return (
    <>
      {session && (
        <div className="grid gap-s">
          <MumbleUserInfo variant={MUMBLE_USER_INFO_VARIANT.REPLY} displayname="First Name" username={'todo'} />
          <MumbleCreate type={MUMBLE_TYPE.REPLY} parentId={params.id} />
        </div>
      )}

      {replies.count === 0 ? (
        <>this post hast no replies...</>
      ) : (
        replies.data.map((post) => <MumbleReply post={post} key={post.id} />)
      )}
    </>
  );
}
