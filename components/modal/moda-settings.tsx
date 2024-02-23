'use client';
import { useRef, useState } from 'react';
import {
  Label,
  Modal,
  Icon,
  Input,
  TextArea,
} from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

export const ModalSettings = () => {
  const [modalState, setModalState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button type="button" id="modal-settings" aria-label="Settings" onClick={() => setModalState(!modalState)}>
        <Icon variant="settings" size="l" className="fill-white transition hover:rotate-90" />
      </button>
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
        title="Settings"
      >
        <Label size="xl" as="h1" className="mb-m">
          Persönliche Einstellungen
        </Label>
        <Input defaultValue="" label="Name Vorname" name="name" placeholder="" className="mb-m" />
        <Input defaultValue="" label="E-Mail-Adresse" name="email" placeholder="" className="mb-m" />
        <Input defaultValue="" label="Ortschaft" name="email" placeholder="" className="mb-m" />
        <TextArea label="Biografie" name="textarea" placeholder="Placeholder" />
        <Label size="xl" as="h1" className="mb-m mt-xl">
          Passrodd ändern
        </Label>
        <Input defaultValue="" label="Altes Passwort" type="password" name="email" placeholder="" className="mb-m" />
        <Input defaultValue="" label="Neues Passwort" type="password" name="email" placeholder="" />
      </Modal>
    </>
  );
};
