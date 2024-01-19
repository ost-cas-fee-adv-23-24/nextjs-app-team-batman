import { createPost } from '@/mumble/api';
import { Button, TextArea } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

export default function NewPost() {
  async function createNewPost(data: FormData) {
    'use server';

    if (!data.has('text')) {
      // eslint-disable-next-line no-console
      console.log('No text or access token');
      return;
    }

    const text = data.get('text') as string;
    await createPost(text);
  }

  return (
    <form action={createNewPost}>
      <TextArea name="text" label="Post" />
      <Button type="submit" variant="secondary">
        Create
      </Button>
    </form>
  );
}
