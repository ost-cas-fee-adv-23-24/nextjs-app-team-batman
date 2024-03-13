import { AVATAR_FALLBACK } from '@/app/app-config';
import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';

export const getUserAvatar = async (id: string | undefined) => {
  if (id === undefined) {
    return AVATAR_FALLBACK;
  }

  const user = await GET_USER_BY_ID({ id: id });

  if (user?.avatarUrl) {
    return user.avatarUrl;
  }

  return AVATAR_FALLBACK;
};
