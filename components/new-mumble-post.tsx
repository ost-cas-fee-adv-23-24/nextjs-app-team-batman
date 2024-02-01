import { CREATE_POST } from '@/utils/api/api-service-post';
import { Button, Heading, TextArea } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import ImageUploadModal from './upload-image-modal';

export default function NewMumblePost() {
  async function createNewPost(data: FormData) {
    'use server';

    if (!data.has('text')) {
      // eslint-disable-next-line no-console
      console.log('No text or access token');
      return;
    }

    const text = data.get('text') as string;
    const media = data.get('media') as File;

    await CREATE_POST({ text, media });
  }

  return (
    <form action={createNewPost} className="grid w-full gap-s">
      <Heading level={4} className="text-base-900">
        Hey, was gibt’s neues?
      </Heading>
      <TextArea name="text" placeholder="Deine Meinung zählt!" rows={6} />

      <div className="grid grid-cols-2 gap-s">
        <ImageUploadModal />

        <Button type="submit" variant="primary" fullWidth icon="send">
          Create
        </Button>
      </div>
    </form>
  );
}
