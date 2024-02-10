import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Image from 'next/image';

import { GET_USER_BY_ID } from '@/utils/api/api-actions-user';
import { APIError } from '@/utils/api/api-service-base';
import { notFound } from 'next/navigation';
import { ProfileImage } from './profileImage';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const user = await GET_USER_BY_ID({ id: params.id });
    return (
      <div className="py-4 px-6 md:py-8 md:px-12 rounded-xl order-1 border-transparent lg:max-w-3xl">
        <div className="relative">
          <div className="mb-4 relative h-[320px] cursor-pointer overflow-hidden rounded-m bg-primary-600 object-contain">
            <Image src={ProfileImage} alt="profile image" className="duration-200 ease-in-out hover:opacity-50" fill />
          </div>
          <div className="absolute bottom-[-70px] right-[30px]">
            <Avatar
              image={{
                src: user.avatarUrl ? user.avatarUrl : 'https://nextui.org/images/fruit-1.jpeg',
                alt: 'avatar',
              }}
              size="xl"
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
