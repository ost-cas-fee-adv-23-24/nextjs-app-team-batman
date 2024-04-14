'use client';
import { useState } from 'react';
// import { UPDATE_MUMBLE } from '@/utils/api/api-actions-post';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { Icon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useSession } from 'next-auth/react';
import { ModalPostEdit } from '@/components/modal/modal-post-edit';

export const MumblePostEdit = ({ post }: { post: TAPIPost | TAPIReply }) => {
  const { data } = useSession();
  const [modalState, setModalState] = useState<boolean>(false);
  //   const handleEdit = () => {
  //     () => {}
  //     await UPDATE_MUMBLE({ id: post.id });
  //   };

  if (!data?.user || data.user.id !== post.creator.id) return null;
  return (
    <>
      <button
        onClick={() => setModalState(true)}
        className="flex w-fit place-items-center gap-xs rounded-s bg-accent-100 p-xs mumble-font-label-s"
        data-testid="mumble-post-delete"
      >
        <Icon variant="edit" className="fill-accent-600" size="s" />
        <span className="text-accent-600">Mumble Editieren</span>
      </button>
      <ModalPostEdit modalState={modalState} setModalState={setModalState} />
    </>
  );
};
