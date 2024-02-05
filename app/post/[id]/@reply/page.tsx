import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Card } from '@/components/card';
import { CreateMumble } from '@/components/create-mumble';
import { MUMBLE_TYPE } from '@/utils/api/api-types';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return null;
  return (
    <Card>
      <CreateMumble type={MUMBLE_TYPE.REPLY} parentId={params.id} />
    </Card>
  );
}
