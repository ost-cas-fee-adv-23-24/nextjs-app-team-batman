'use client';
import { Button, ImageUpload, Modal } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useRef, useState } from 'react';

export const ModalImageUpload = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button type="button" variant="secondary" fullWidth icon="upload" onClick={() => setModalState(!modalState)}>
        Bild hochladen
      </Button>
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
    </>
  );
};
