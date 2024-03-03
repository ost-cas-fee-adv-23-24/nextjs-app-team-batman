'use client';
import { UPDATE_USER } from '@/utils/api/api-actions-user';
import { TAPIUser } from '@/utils/api/api-types';
import { Icon, Input, Label, Modal } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useRef, useState } from 'react';

interface IModalSettings {
  user: TAPIUser;
}

export const ModalSettings = ({ user }: IModalSettings) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    if (user) {
      await UPDATE_USER({
        data: {
          firstname: formData.get('firstname') as string,
          lastname: formData.get('lastname') as string,
          username: formData.get('username') as string,
        },
        id: user.id,
      });
    }
  };

  return (
    <>
      <button
        type="button"
        id="modal-settings"
        className="group grid place-items-center gap-xs"
        aria-label="Settings"
        onClick={() => setModalState(!modalState)}
      >
        <Icon variant="settings" size="m" className="fill-white transition group-hover:rotate-90" />
        <Label size="s" className="hidden cursor-pointer text-white md:block">
          Settings
        </Label>
      </button>
      <Modal
        isOpen={modalState}
        onClose={() => {
          setModalState(!modalState);
        }}
        onSubmit={() => {
          formRef.current?.requestSubmit();
        }}
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
            className="mb-m"
          />
        </form>
      </Modal>
    </>
  );
};
