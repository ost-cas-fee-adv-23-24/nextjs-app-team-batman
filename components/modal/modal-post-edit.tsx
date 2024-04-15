'use client';
import { useState, useRef } from 'react';
import { Modal, ImageUpload, TextArea } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { UPDATE_MUMBLE } from '@/utils/api/api-actions-post';

interface IModalPostEdit {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  post: TAPIPost | TAPIReply;
}

export const ModalPostEdit = ({ modalState, setModalState, post }: IModalPostEdit) => {
  const [showImageUploader, setShowImageUploader] = useState<boolean>(!!post.mediaUrl);
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    const result = await UPDATE_MUMBLE({ id: post.id, data: formData });
    if (!result?.errors) {
      setModalState(false);
    }
  };

  return (
    <Modal
      isOpen={modalState}
      onClose={() => {
        setModalState(!modalState);
      }}
      onSubmit={() => {
        formRef.current?.requestSubmit();
      }}
      width="l"
      title="Mumble Editieren"
    >
      <form ref={formRef} action={formAction} className="grid w-full gap-s" data-testid="mumble-edit">
        <TextArea name="text" rows={8} data-testid="mumble-edit--text" className="mb-m">
          {post.text}
        </TextArea>
        {showImageUploader ? (
          <div onClick={() => setShowImageUploader(false)}>image</div>
        ) : (
          <ImageUpload
            id="temp-upload-media"
            name="temp-media"
            //   onChange={(event) => {
            //     setCurrentEvent(event);
            //   }}
          />
        )}
      </form>
    </Modal>
  );
};
