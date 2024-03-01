'use client';
import { useRef, useState } from 'react';
import { Label, Modal, Icon, Input } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { TAPIUser } from '@/utils/api/api-types';
// import { useRouter } from 'next/navigation';
import { updateUser } from './actions';

interface IModalSettings {
  user: TAPIUser;
}

export const ModalSettings = ({ user }: IModalSettings) => {
  const [modalState, setModalState] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // const router = useRouter();

  interface FormData {
    firstname: string;
    lastname: string;
    username: string;
  }

  const formAction = async (formData: FormData) => {
    console.log('formData', formData);
    if (user) {
      // await updateUser(user.id, formData);
    }
    //    formRef.current?.reset();
  };

  const handleSubmit = () => {
    /* TodO fix saving */
    formRef.current?.requestSubmit();
    // setModalState(!modalState);
    //router.refresh();
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
            id="firstname"
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
