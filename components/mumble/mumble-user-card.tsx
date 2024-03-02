'use client';
import { UPDATE_USER_AVATAR } from '@/utils/api/api-actions-user';
import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';
import { Avatar, ImageUpload, Modal } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { ProfileImage } from './profileImage';
interface IMumbleUserCard {
  userId: string;
  avatarUrl?: string | null;
  sessionUserId?: string;
}

export const MumbleUserCard = ({ avatarUrl, userId, sessionUserId }: IMumbleUserCard) => {
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
      formRef.current?.reset();
    }
  };

  const handleClose = () => {
    formRef.current?.requestSubmit();
    setModalState(!modalState);
    router.refresh();
  };

  return (
    <>
      <div className="relative">
        <div className="relative h-[320px] cursor-pointer overflow-hidden rounded-m bg-primary-600 object-contain">
          <Image src={ProfileImage} alt="profile image" className="duration-200 ease-in-out hover:opacity-50" fill />
        </div>
        <div className="absolute bottom-[-70px] right-[30px] z-10">
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
          <Modal
            isOpen={modalState}
            onClose={() => {
              setModalState(!modalState);
            }}
            onSubmit={handleClose}
            width="m"
            title="Bild hochladen"
          >
            <ImageUpload
              id="temp-upload-media"
              name="temp-media"
              onChange={(event) => {
                if (inputRef.current && event.target.files && event.target.files.length > 0) {
                  inputRef.current.files = event.target.files;
                }
              }}
            />
          </Modal>
        </form>
      )}
    </>
  );
};
