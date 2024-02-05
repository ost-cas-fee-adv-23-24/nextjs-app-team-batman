'use client';
import { CREATE_MUMBLE } from '@/utils/api/api-service-post';
import { MUMBLE_TYPE } from '@/utils/api/api-types';
import { Button, Heading, TextArea } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useRef, useState } from 'react';
import ImageUploadModal from '../upload-image-modal';

type TNewMumblePost = { type: MUMBLE_TYPE.REPLY; parentId: string } | { type: MUMBLE_TYPE.POST };

export const CreateMumble = (props: TNewMumblePost) => {
  const [formState, setFormState] = useState<Awaited<ReturnType<typeof CREATE_MUMBLE>>>();
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = async (formData: FormData) => {
    if (props.type === MUMBLE_TYPE.POST) {
      const result = await CREATE_MUMBLE({
        data: formData,
        type: props.type,
      });
      setFormState(result);
      if (!result?.errors) {
        formRef.current?.reset();
      }
    }

    if (props.type === MUMBLE_TYPE.REPLY) {
      const result = await CREATE_MUMBLE({
        data: formData,
        type: props.type,
        id: props.parentId,
      });
      setFormState(result);
      if (!result?.errors) {
        formRef.current?.reset();
      }
    }
  };

  const placeholder = props.type === MUMBLE_TYPE.POST ? 'Deine Meinung zählt!' : 'Und was meinst du dazu?';

  return (
    <form ref={formRef} action={formAction} className="grid w-full gap-s">
      {props.type === MUMBLE_TYPE.POST && (
        <Heading level={3} visualLevel={4} className="text-primary-600">
          Hey, was gibt’s neues?
        </Heading>
      )}

      <TextArea
        name="text"
        placeholder={placeholder}
        rows={6}
        error={formState?.errors?.text?.[0] ?? formState?.errors?.media?.[0]}
      />
      <div className="grid grid-cols-2 gap-s">
        <ImageUploadModal />
        <Button type="submit" variant="primary" fullWidth icon="send">
          Absenden
        </Button>
      </div>
    </form>
  );
};
