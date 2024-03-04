import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';

export const getUser = async (id: string | undefined) => {
  if (id === undefined) {
    return undefined;
  }
  const user = await GET_USER_BY_ID({ id: id });

  if (user) {
    return user;
  }

  return undefined;
};
