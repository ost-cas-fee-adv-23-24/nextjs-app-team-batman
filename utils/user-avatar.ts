import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';

export const userAvatar = async (id: string | undefined) => {
  if (id === undefined) {
    return AVATAR_FALLBACK;
  }

  const user = await GET_USER_BY_ID({ id: id });

  if (user?.avatarUrl) {
    return user.avatarUrl;
  }

  return AVATAR_FALLBACK;
};
