'use client';
import { useRef, useState } from 'react';
import {
  Avatar,
  ImageUpload,
  Modal,
  LinkIcon,
  Label,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { ProfileImage } from './profileImage';
import { AVATAR_FALLBACK } from '@/utils/avatar-fallback';
import Image from 'next/image';
interface IMumbleUserCard {
  firstname: string;
  lastname: string;
  username: string;
  avatarUrl?: string;
}

export const MumbleUserCard = ({ firstname, lastname, username, avatarUrl }: IMumbleUserCard) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
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
          />
        </div>
      </div>
      <input type="file" name="media" id="upload-media" ref={inputRef} hidden />
      <Modal
        isOpen={modalState}
        onClose={() => {
          setModalState(!modalState);
        }}
        onSubmit={() => {
          setModalState(!modalState);
        }}
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
    </div>
  );
};