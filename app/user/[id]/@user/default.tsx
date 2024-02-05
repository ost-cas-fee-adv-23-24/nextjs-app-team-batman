import { APIError } from '@/utils/api/api-service-base';
import { GET_USER_BY_ID } from '@/utils/api/api-service-user';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const user = await GET_USER_BY_ID({ id: params.id });
    return (
      <div className="overflow-auto">
        <h1>USER PROFILE</h1>
        <code>{JSON.stringify(user)}</code>
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      return notFound();
    }
    throw error;
  }
}
