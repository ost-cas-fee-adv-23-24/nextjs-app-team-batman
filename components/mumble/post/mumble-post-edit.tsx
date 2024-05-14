'use client';
import { ModalPostEdit } from '@/components/modal/modal-post-edit';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { cn } from '@/utils/tailwind';
import { Icon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useState } from 'react';

export const MumblePostEdit = ({ post }: { post: TAPIPost | TAPIReply }) => {
  const [modalState, setModalState] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setModalState(true)}
        className={cn(
          'flex w-fit place-items-center gap-xs rounded-s p-xs duration-150 mumble-font-label-s ',
          'bg-base-100 fill-base-800 text-base-800',
          'hover:bg-accent-200 hover:fill-accent-800 hover:text-accent-800',
        )}
        data-testid="mumble-post--edit"
      >
        <Icon variant="edit" size="s" />
        <span>Mumble Editieren</span>
      </button>
      <ModalPostEdit modalState={modalState} setModalState={setModalState} post={post} />
    </>
  );
};
