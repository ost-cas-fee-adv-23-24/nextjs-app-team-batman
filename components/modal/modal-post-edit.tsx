'use client';
import { useState, useRef } from 'react';
import {
  Modal,
  Icon,
  ImageUpload,
  TextArea,
  Image,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { UPDATE_MUMBLE } from '@/utils/api/api-actions-post';

interface IModalPostEdit {
  modalState: boolean;
  setModalState: (state: boolean) => void;
  post: TAPIPost | TAPIReply;
}

export const ModalPostEdit = ({ modalState, setModalState, post }: IModalPostEdit) => {
  const [showImageUploader, setShowImageUploader] = useState<boolean>(!post.mediaUrl);
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
        setShowImageUploader(false);
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
          <ImageUpload id="temp-upload-media" name="media" />
        ) : (
          <div
            onClick={() => setShowImageUploader(true)}
            className="group relative ml-auto mr-auto flex max-w-[300px] cursor-pointer justify-center"
          >
            <div className="transition-all duration-300 group-hover:opacity-50">
              <Image src={post.mediaUrl ?? ''} alt="Bildvorschau" className="mx-auto" rounded="m" />
            </div>
            <div className="absolute bottom-[40%] flex hidden h-[50px] w-[50px] items-center justify-center rounded-full bg-base-600 opacity-50 transition-all duration-300 group-hover:flex group-hover:opacity-100">
              <Icon variant="edit" size="s" className="fill-white" />
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};
