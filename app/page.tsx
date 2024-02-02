import { Card } from '@/components/card/card';
import LivePosts from '@/components/live-posts';
import { NewMumblePost, POST_TYPE } from '@/components/new-mumble-post';
import Post from '@/components/post';
import { GET_POSTS } from '@/utils/api/api-service-post';
import { Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { auth } from './api/auth/[...nextauth]/auth';

export default async function Home() {
  const session = await auth();
  const posts = await GET_POSTS();
  const image = {
    src: 'https://nextui.org/images/fruit-1.jpeg',
    alt: 'test person',
  };

  return (
    <div className="grid gap-l">
      <div className="grid gap-xs">
        <Heading level={1} visualLevel={2} className="text-primary-600">
          Willkommen auf Mumble
        </Heading>
        <Heading level={4} className="text-base-500">
          Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.
        </Heading>
      </div>

      <div className="grid gap-s">
        {session && (
          <Card>
            <NewMumblePost type={POST_TYPE.MUMBLE} />
          </Card>
        )}

        <LivePosts />

        {posts.data.map((post) => (
          <Card image={image} key={post.id}>
            <Post post={post} />
          </Card>
        ))}
      </div>
    </div>
  );
}
