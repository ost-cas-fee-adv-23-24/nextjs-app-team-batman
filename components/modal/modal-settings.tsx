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
  const [formState, setFormState] = useState<Awaited<ReturnType<typeof UPDATE_USER>>>();

  const formAction = async (formData: FormData) => {
    if (user) {
      const result = await UPDATE_USER({
        data: {
          firstname: formData.get('firstname') as string,
          lastname: formData.get('lastname') as string,
          username: formData.get('username') as string,
        },
        id: user.id,
      });

      setFormState(result);

      if (!result?.errors) {
        setModalState(false);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        data-testid="modal-settings-button"
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
        data-testid="modal-settings"
      >
        <form ref={formRef} action={formAction} className="grid gap-m">
          <Label size="xl" as="h1">
            Persönliche Einstellungen
          </Label>
          <Input
            defaultValue={user.firstname ?? ''}
            label="Vorname"
            name="firstname"
            error={formState?.errors?.firstname?.[0] ?? ''}
          />
          <Input
            defaultValue={user.lastname ?? ''}
            label="Name"
            name="lastname"
            error={formState?.errors?.lastname?.[0] ?? ''}
          />
          <Input
            defaultValue={user?.username ? user.username : ''}
            label="Benutzername"
            name="username"
            error={formState?.errors?.username?.[0] ?? ''}
          />
        </form>
      </Modal>
    </>
  );
};
