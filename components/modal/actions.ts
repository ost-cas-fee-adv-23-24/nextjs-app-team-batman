'use server';
import { UPDATE_USER } from '@/utils/api/api-actions-user';

export async function updateUser(id: string, formData: any) {
  await UPDATE_USER({
    data: {
      firstname: formData.firstname,
      lastname: formData.lastname,
      username: formData.username,
    },
    id,
  });
}
