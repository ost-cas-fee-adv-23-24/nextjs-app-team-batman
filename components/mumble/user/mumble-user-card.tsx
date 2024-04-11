'use client';
import { AVATAR_FALLBACK } from '@/app/app-config';
import { ModalImageUpload } from '@/components/modal/modal-image-upload';
import { UPDATE_USER_AVATAR } from '@/utils/api/api-actions-user';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
interface IMumbleUserCard {
  userId: string;
  profileImage: string;
  avatarUrl?: string | null;
  sessionUserId?: string;
}

export const MumbleUserCard = ({ avatarUrl, userId, sessionUserId, profileImage }: IMumbleUserCard) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const isOwnUser = userId === sessionUserId;

  const formAction = async (formData: FormData) => {
    if (sessionUserId) {
      await UPDATE_USER_AVATAR({
        data: formData,
        id: sessionUserId,
      });
      router.refresh();
    }
  };

  const handleClose = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <div className="relative">
        <div className="relative h-[320px] overflow-hidden rounded-m bg-primary-600 object-contain">
          <Image
            src={profileImage}
            alt="profile image"
            className="object-cover duration-200 ease-in-out hover:opacity-50"
            fill
          />
        </div>
        <div className="absolute bottom-[-70px] right-[30px] z-10" data-testid="avatar-wrapper">
          <Avatar
            image={{
              src: avatarUrl ?? AVATAR_FALLBACK,
              alt: 'avatar',
            }}
            size="xl"
            onEdit={() => setModalState(!modalState)}
            edit={isOwnUser}
          />
        </div>
      </div>
      {isOwnUser && (
        <form ref={formRef} action={formAction} className="grid w-full gap-s">
          <input type="file" name="media" id="upload-media" ref={inputRef} hidden />
          <ModalImageUpload
            inputRef={inputRef}
            modalState={modalState}
            setModalState={setModalState}
            onChange={handleClose}
          />
        </form>
      )}
    </>
  );
};
