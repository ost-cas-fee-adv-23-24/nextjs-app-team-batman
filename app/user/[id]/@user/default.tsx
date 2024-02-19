import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';
import { MumbleUserCard } from '@/components/mumble/mumble-user-card';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const user = await GET_USER_BY_ID({ id: params.id });
    return (
      <div>
        <MumbleUserCard
          firstname={user.firstname ? user.firstname : ''}
          lastname={user.lastname ? user.lastname : ''}
          username={user.username ? user.username : ''}
          avatarUrl={user.avatarUrl ? user.avatarUrl : undefined}
        />
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
