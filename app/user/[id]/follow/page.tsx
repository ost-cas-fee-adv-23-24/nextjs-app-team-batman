import { LayoutTinyUserWrapper } from '@/components/layout/layout-tinyuser-wrapper';
import { APIError } from '@/utils/api/api-service-base';
import { delay } from '@/utils/helpers/delay';
import { notFound } from 'next/navigation';
import { GET_USER_FOLLOWEES } from '@/utils/api/api-actions-user';
import { MumbleUserCard } from '@/components/mumble/user/mumboe-user-tiny-card';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const [followers] = await Promise.all([GET_USER_FOLLOWEES({ id: params.id }), delay()]);
    return (
      <LayoutTinyUserWrapper>
        {followers?.data?.map((user) => {
          return (
            <MumbleUserCard
              id={user.id}
              firstname={user.firstname ?? ''}
              lastname={user.lastname ?? ''}
              avatarUrl={user.avatarUrl ?? ''}
              key={user.id}
            />
          );
        })}
      </LayoutTinyUserWrapper>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
