import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Card } from '@/components/card';
import { NewMumblePost, POST_TYPE } from '@/components/new-mumble-post';

export default async function Page({ params }: { params: { id: string } }) {
  // throw new Error('Not implemented');

  const session = await auth();

  return (
    <div>
      {session && (
        <Card>
          <NewMumblePost type={POST_TYPE.REPLY} parentId={params.id} />
        </Card>
      )}
    </div>
  );
}
