import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MumbleUserCard } from '@/components/mumble/mumble-user-card';
import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';

export default async function UserTop({ params }: { params: { id: string } }) {
  const session = await auth();
  try {
    const user = await GET_USER_BY_ID({ id: params.id });
    return (
      <div>
        <MumbleUserCard
          firstname={user.firstname ? user.firstname : ''}
          lastname={user.lastname ? user.lastname : ''}
          username={user.username ? user.username : ''}
          avatarUrl={user.avatarUrl ? user.avatarUrl : undefined}
          userId={params.id ? params.id : undefined}
          sessionUserId={session?.user?.id ? session.user.id : undefined}
        />
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
