import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumbleUserCard } from '@/components/mumble/mumble-user-card';
import { MUMBLE_USER_INFO_VARIANT, MumbleUserInfo } from '@/components/mumble/mumble-user-info';
import { ProfileImage } from '@/components/mumble/profileImage';
import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { APIError } from '@/utils/api/api-service-base';
import { delay } from '@/utils/delay';
import { notFound } from 'next/navigation';

export default async function UserTop({ params }: { params: { id: string } }) {
  const session = await auth();
  try {
    const user = await Promise.all([GET_USER_BY_ID({ id: params.id }), delay()]).then((results) => results[0]);
    return (
      <div>
        <MumbleUserCard
          userId={user.id}
          sessionUserId={session?.user?.id}
          avatarUrl={user.avatarUrl}
          profileImage={ProfileImage}
        />
        <div className="mt-m">
          <MumbleUserInfo variant={MUMBLE_USER_INFO_VARIANT.DETAILVIEW} user={user} />
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
