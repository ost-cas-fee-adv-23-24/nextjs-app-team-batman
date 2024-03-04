import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumbleCard } from '@/components/mumble/card/mumble-card';
import { MumbleCreate } from '@/components/mumble/create/mumble-create';
import { MUMBLE_TYPE } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { getUserAvatar } from '@/utils/helpers/get-user-avatar';

export default async function DashboardCreateMumble() {
  const session = await auth();
  const avatar = await Promise.all([getUserAvatar(session?.user?.id), delay()]).then((results) => results[0]);

  if (!session) return null;

  return (
    <MumbleCard imageSrc={avatar}>
      <MumbleCreate type={MUMBLE_TYPE.POST} />
    </MumbleCard>
  );
}
