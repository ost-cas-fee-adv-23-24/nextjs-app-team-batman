'use client';
import { useRef, useState } from 'react';
import { Label, Modal, Icon, Input } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { TAPIUser } from '@/utils/api/api-types';
//import { UPDATE_USER } from '@/utils/api/api-actions-user';
import { useRouter } from 'next/navigation';

interface IModalSettings {
  user?: TAPIUser;
}

export const ModalSettings = ({ user }: IModalSettings) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // const formAction = async (formData: { firstname: string; lastname: string; username: string }) => {
  //   if (user) {
  //     await UPDATE_USER({
  //       data: {
  //         firstname: formData.firstname,
  //         lastname: formData.lastname,
  //         username: formData.username,
  //       },
  //       id: user?.id,
  //     });
  //     formRef.current?.reset();
  //   }
  // };

  const handleClose = () => {
    formRef.current?.requestSubmit();
    setModalState(!modalState);
    router.refresh();
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
      <input type="file" name="media" id="upload-media" ref={inputRef} hidden />
      <Modal
        isOpen={modalState}
        onClose={() => {
          setModalState(!modalState);
        }}
        onSubmit={handleClose}
        width="m"
        title="Settings"
      >
        <form ref={formRef}>
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
            disabled
            placeholder=""
            className="mb-m"
          />
        </form>
      </Modal>
    </>
  );
};
