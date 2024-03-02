'use client';
import { useRef, useState } from 'react';
import { Label, Modal, Icon, Input } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { TAPIUser } from '@/utils/api/api-types';
import { updateUser } from './actions';

interface IModalSettings {
  user: TAPIUser;
}

export const ModalSettings = ({ user }: IModalSettings) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (FormData: FormData) => {
    if (user) {
      await updateUser(user.id, FormData);
    }
  };

  const handleSubmit = () => {
    /* TodO fix saving */
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <button
        type="button"
        id="modal-settings"
        className="ml-m"
        aria-label="Settings"
        onClick={() => setModalState(!modalState)}
      >
        <Icon variant="settings" size="m" className="ml-auto mr-auto fill-white transition hover:rotate-90" />
        <Label size="s" className="mt-xs hidden cursor-pointer text-white md:block">
          Settings
        </Label>
      </button>
      <Modal
        isOpen={modalState}
        onClose={() => {
          setModalState(!modalState);
        }}
        onSubmit={handleSubmit}
        width="m"
        title="Settings"
      >
        <form ref={formRef} action={formAction}>
          <Label size="xl" as="h1" className="mb-m">
            Persönliche Einstellungen
          </Label>
          <Input
            defaultValue={user?.firstname ? user.firstname : ''}
            label="Vorname"
            name="firstname"
            placeholder=""
            className="mb-m"
          />
          <Input
            defaultValue={user?.lastname ? user.lastname : ''}
            label="Name"
            name="lastname"
            placeholder=""
            className="mb-m"
          />
          <Input
            defaultValue={user?.username ? user.username : ''}
            label="Benutzername"
            name="username"
            placeholder=""
            className="disabled mb-m"
          />
        </form>
      </Modal>
    </>
  );
};
