'use server';
import { UPDATE_USER } from '@/utils/api/api-actions-user';

export async function updateUser(id: string, formData: FormData) {
  const firstname = formData.get('firstname') as string;
  const lastname = formData.get('lastname') as string;
  const username = formData.get('username') as string;

  await UPDATE_USER({
    data: {
      firstname,
      lastname,
      username,
    },
    id,
  });
}
