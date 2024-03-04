import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumbleUserCard } from '@/components/mumble/user/mumble-user-card';
import { MumbleUserInfo } from '@/components/mumble/user/mumble-user-info';
import { GET_USER_BY_ID, GET_USER_FOLLOWERS } from '@/utils/api/api-actions-user';
import { APIError } from '@/utils/api/api-service-base';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { ProfileImage } from '@/utils/helpers/profile-image';
import { notFound } from 'next/navigation';
import UserTabs from '@/app/user/[id]/_user-tabs';
import UserFollow from '@/app/user/[id]/_user-follow';

export default async function UserCard({ params }: { params: { id: string } }) {
  const session = await auth();
  try {
    const user = await Promise.all([GET_USER_BY_ID({ id: params.id }), delay()]).then((results) => results[0]);
    const userFollowees = await Promise.all([GET_USER_FOLLOWERS({ id: params.id }), delay()]).then(
      (results) => results[0],
    );
    const test =
      session?.user.id === user.id ? (
        <div className="mt-s max-w-[400px]">
          <UserTabs id={params.id} />
        </div>
      ) : (
        <UserFollow id={params.id} />
      );

    return (
      <div>
        {JSON.stringify(user)}
        <MumbleUserCard
          userId={user.id}
          sessionUserId={session?.user?.id}
          avatarUrl={user.avatarUrl}
          profileImage={ProfileImage}
        />
        <div className="mt-m">
          <MumbleUserInfo variant={MUMBLE_VARIANT.DETAILVIEW} user={user} userFollowees={userFollowees} />
        </div>
        {test}
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
