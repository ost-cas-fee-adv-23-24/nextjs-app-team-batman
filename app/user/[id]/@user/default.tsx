import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Image from 'next/image';

import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';
import { ProfileImage } from './profileImage';
import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const user = await GET_USER_BY_ID({ id: params.id });
    return (
      <div className="relative">
        <div className="mb-4 relative h-[320px] cursor-pointer overflow-hidden rounded-m bg-primary-600 object-contain">
          <Image src={ProfileImage} alt="profile image" className="duration-200 ease-in-out hover:opacity-50" fill />
        </div>
        <div className="absolute bottom-[-70px] right-[30px]">
          <Avatar
            image={{
              src: user.avatarUrl ? user.avatarUrl : AVATAR_FALLBACK,
              alt: 'avatar',
            }}
            size="xl"
          />
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
