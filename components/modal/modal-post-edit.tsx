'use client';
import { useState } from 'react';
import { Modal, ImageUpload, TextArea } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';

interface IModalPostEdit {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  post: TAPIPost | TAPIReply;
}

export const ModalPostEdit = ({ modalState, setModalState, post }: IModalPostEdit) => {
  const [showImageUploader, setShowImageUploader] = useState<boolean>(!!post.mediaUrl);
  return (
    <>
      <Modal
        isOpen={modalState}
        onClose={() => {
          setModalState(!modalState);
        }}
        onSubmit={() => {
          setModalState(!modalState);
        }}
        width="l"
        title="Mumble Editieren"
      >
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
      </Modal>
    </>
  );
};
