import { auth } from '@/app/api/auth/[...nextauth]/auth';
import UserFollow from '@/app/user/[id]/_user-follow';
import UserTabs from '@/app/user/[id]/_user-tabs';
import { MumbleUserCard } from '@/components/mumble/user/mumble-user-card';
import { MumbleUserInfo } from '@/components/mumble/user/mumble-user-info';
import { GET_USER_BY_ID, GET_USER_FOLLOWERS } from '@/utils/api/api-actions-user';
import { APIError } from '@/utils/api/api-service-base';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { ProfileImage } from '@/utils/helpers/profile-image';
import { notFound } from 'next/navigation';

export default async function UserCard({ params }: { params: { id: string } }) {
  const session = await auth();
  try {
    const [user, followers] = await Promise.all([
      GET_USER_BY_ID({ id: params.id }),
      GET_USER_FOLLOWERS({ id: params.id }),
      delay(),
    ]);

    const iAmFollower = followers.data.some((follower) => {
      return follower.id === session?.user.id;
    });

    const userActions =
      session?.user.id === user.id ? (
        <div className="mt-s max-w-[400px]">
          <UserTabs id={params.id} />
        </div>
      ) : (
        <UserFollow id={params.id} iAmFollower={iAmFollower} />
      );

    return (
      <div>
        <MumbleUserCard
          userId={user.id}
          sessionUserId={session?.user?.id}
          avatarUrl={user.avatarUrl}
          profileImage={ProfileImage}
        />
        <div className="mt-m">
          <MumbleUserInfo variant={MUMBLE_VARIANT.DETAILVIEW} user={user} />
        </div>
        {userActions}
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
