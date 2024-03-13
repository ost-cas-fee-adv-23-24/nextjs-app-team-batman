'use client';
import { ImageUpload, Modal } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { ChangeEvent, useState } from 'react';

interface IModalImageUpload {
  onChange: (image: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  modalState: boolean;
  setModalState: (state: boolean) => void;
}

export const ModalImageUpload = ({ onChange, inputRef, modalState, setModalState }: IModalImageUpload) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [currentEvent, setCurrentEvent] = useState<ChangeEvent<HTMLInputElement> | null>(null);
  return (
    <>
      <Modal
        isOpen={modalState}
        onClose={() => {
          setModalState(!modalState);
        }}
        onSubmit={() => {
          setModalState(!modalState);
          if (currentEvent && inputRef.current && currentEvent.target.files && currentEvent.target.files.length > 0) {
            inputRef.current.files = currentEvent.target.files;
            onChange?.(URL.createObjectURL(currentEvent.target.files[0]));
          }
        }}
        width="m"
        title="Bild hochladen"
      >
        <ImageUpload
          id="temp-upload-media"
          name="temp-media"
          onChange={(event) => {
            setCurrentEvent(event);
          }}
        />
      </Modal>
    </>
  );
};
