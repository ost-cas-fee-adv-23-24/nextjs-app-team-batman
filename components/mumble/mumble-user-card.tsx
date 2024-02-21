'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  ImageUpload,
  Modal,
  LinkIcon,
  Label,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { UPDATE_USER_AVATAR } from '@/utils/api/api-actions-user';
import { ProfileImage } from './profileImage';
import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';
import Image from 'next/image';
interface IMumbleUserCard {
  firstname: string;
  lastname: string;
  username: string;
  avatarUrl?: string;
  userId?: string;
  sessionUserId?: string;
}

export const MumbleUserCard = ({
  firstname,
  lastname,
  username,
  avatarUrl,
  userId,
  sessionUserId,
}: IMumbleUserCard) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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
      <form ref={formRef} action={formAction} className="grid w-full gap-s">
        <div className="relative">
          <div className="mb-4 relative h-[320px] cursor-pointer overflow-hidden rounded-m bg-primary-600 object-contain">
            <Image src={ProfileImage} alt="profile image" className="duration-200 ease-in-out hover:opacity-50" fill />
          </div>
          <div className="absolute bottom-[-70px] right-[30px]">
            <Avatar
              image={{
                src: avatarUrl ?? AVATAR_FALLBACK,
                alt: 'avatar',
              }}
              size="xl"
              onEdit={() => setModalState(!modalState)}
              edit={userId === sessionUserId}
            />
          </div>
        </div>
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
        <div className="flex flex-col gap-xs">
          <Label size="xl" as="h1" className="mt-m">
            {`${firstname} ${lastname}`}
          </Label>
          <div className="flex flex-wrap gap-s">
            <LinkIcon icon="profile" text={username ? username : ''} />
            <LinkIcon icon="location" text="Switzerland" variant="secondary" />
          </div>
        </div>
      </form>
    </>
  );
};
