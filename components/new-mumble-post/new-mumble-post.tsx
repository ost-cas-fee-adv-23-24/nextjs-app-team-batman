import { CREATE_POST, CREATE_POST_REPLIES } from '@/utils/api/api-service-post';
import { API_ROUTES, RouteService } from '@/utils/route-service';
import { Button, Heading, TextArea } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { revalidatePath } from 'next/cache';
import ImageUploadModal from '../upload-image-modal';

export enum POST_TYPE {
  MUMBLE = 'MUMBLE',
  REPLY = 'REPLY',
}

type TNewMumblePost = { type: POST_TYPE; parentId?: string };

export const NewMumblePost = ({ type, parentId }: TNewMumblePost) => {
  async function createNewPost(data: FormData) {
    'use server';

    if (!data.has('text')) {
      // eslint-disable-next-line no-console
      console.log('No text or access token');
      return;
    }

    const text = data.get('text') as string;
    const media = data.get('media') as File;

    if (type === POST_TYPE.REPLY) {
      if (!parentId) {
        throw new Error('No parentId');
      }
      await CREATE_POST_REPLIES({ text, media, id: parentId });
      revalidatePath(RouteService.api(API_ROUTES.POSTS_ID_REPLIES, { id: parentId }));

      return;
    }

    if (type === POST_TYPE.MUMBLE) {
      await CREATE_POST({ text, media });
      // revalidatePath(RouteService.route_api(API_ROUTES.POSTS_ID, { id: params.id }));
      return;
    }

    throw new Error('Wrong POST_TYPE');
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
};
