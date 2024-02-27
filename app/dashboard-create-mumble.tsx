import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumbleCreate } from '@/components/mumble';
import { MumbleCard } from '@/components/mumble/mumble-card';
import { MUMBLE_TYPE } from '@/utils/api/api-types';
import { userAvatar } from '@/utils/user-avatar';

export default async function DashboardCreateMumble() {
  const session = await auth();
  const avatar = await userAvatar(session?.user?.id);

  if (!session) return null;

  return (
    <MumbleCard imageSrc={avatar}>
      <MumbleCreate type={MUMBLE_TYPE.POST} />
    </MumbleCard>
  );
}
