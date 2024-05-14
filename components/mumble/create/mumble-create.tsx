'use client';
import { CREATE_MUMBLE } from '@/utils/api/api-actions-post';
import { MUMBLE_TYPE } from '@/utils/enums';
import { Button, Heading, Image, TextArea } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useRef, useState } from 'react';
import { ModalImageUpload } from '../../modal/modal-image-upload';

type TNewMumblePost = { type: MUMBLE_TYPE.REPLY; parentId: string } | { type: MUMBLE_TYPE.POST };

export const MumbleCreate = (props: TNewMumblePost) => {
  const [formState, setFormState] = useState<Awaited<ReturnType<typeof CREATE_MUMBLE>>>();
  const [modalState, setModalState] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mediaRef = useRef<HTMLInputElement>(null);

  const formAction = async (formData: FormData) => {
    if (props.type === MUMBLE_TYPE.POST) {
      const result = await CREATE_MUMBLE({
        data: formData,
        type: props.type,
      });
      setFormState(result);
      if (!result?.errors) {
        formRef.current?.reset();
        setImage(null);
      }
    }

    if (props.type === MUMBLE_TYPE.REPLY) {
      const result = await CREATE_MUMBLE({
        data: formData,
        type: props.type,
        parentId: props.parentId,
      });
      setFormState(result);
      if (!result?.errors) {
        formRef.current?.reset();
        setImage(null);
      }
    }
  };

  const placeholder = props.type === MUMBLE_TYPE.POST ? 'Deine Meinung zählt!' : 'Und was meinst du dazu?';

  return (
    <form ref={formRef} action={formAction} className="grid w-full gap-s" data-testid="mumble-create">
      {props.type === MUMBLE_TYPE.POST && (
        <Heading level={3} visualLevel={4} className="text-base-900">
          Hey, was gibt’s neues?
        </Heading>
      )}

      {
        // eslint-disable-next-line @next/next/no-img-element
        image && (
          <div className="grid place-content-center">
            <Image src={image} alt="Bildvorschau" className="mx-auto max-h-[150px]" rounded="m" />
            <button
              onClick={() => {
                setImage(null);
                if (mediaRef.current) {
                  mediaRef.current.value = '';
                }
              }}
              className="mt-s text-primary-600 transition-colors hover:text-primary-700"
            >
              Bild entfernen
            </button>
          </div>
        )
      }
      <TextArea
        name="text"
        placeholder={placeholder}
        rows={6}
        error={formState?.errors?.text?.[0] ?? formState?.errors?.media?.[0]}
        data-testid="mumble-create--text"
      />

      <div className="grid grid-cols-1 gap-s sm:grid-cols-2">
        <Button
          type="button"
          variant="secondary"
          fullWidth
          icon="upload"
          onClick={() => setModalState(!modalState)}
          data-testid="mumble-create--media"
        >
          Bild hochladen
        </Button>
        <Button type="submit" variant="primary" fullWidth icon="send" data-testid="mumble-create--send">
          Absenden
        </Button>
      </div>

      <input type="file" name="media" id="upload-media" ref={mediaRef} hidden />
      <ModalImageUpload onChange={setImage} inputRef={mediaRef} modalState={modalState} setModalState={setModalState} />
    </form>
  );
};
