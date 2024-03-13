import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import { MumbleCard } from '@/components/mumble/card/mumble-card';
import { MumbleInfinityPosts } from '@/components/mumble/post/mumble-infinity-posts';
import { MumblePost } from '@/components/mumble/post/mumble-post';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { Heading } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

export const TagPosts = async ({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) => {
  const nothingFound = (
    <div className="rounded-s bg-base-200 p-xs text-base-500">🤔 nichts gefunden, passe deine Suche an!</div>
  );
  if (searchParams.tag === undefined || searchParams.tag === '') {
    return nothingFound;
  }

  const getSanitizedTags = (tags: string | string[] | undefined) => {
    if (!tags) return [];
    return (Array.isArray(tags) ? tags : [tags])
      .map((tag) => tag.split(','))
      .flat()
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '')
      .filter((tag, index, self) => self.indexOf(tag) === index);
  };

  const currentTags = getSanitizedTags(searchParams.tag);

  const posts = await Promise.all([
    GET_POSTS({ query: { limit: MUMBLE_POSTS_PAGINATION, tags: currentTags } }),
    delay(0),
  ]).then((results) => results[0]);

  if (posts.data.length === 0) {
    return nothingFound;
  }

  const headingText = currentTags.map((tag) => `#${tag} `).join(' ');
  return (
    <>
      <Heading level={1} visualLevel={2} className="text-primary-600">
        {headingText}
      </Heading>
      {posts.data.map((post) => (
        <MumbleCard imageSrc={post.creator?.avatarUrl ?? undefined} key={post.id} post={post}>
          <MumblePost post={post} variant={MUMBLE_VARIANT.TIMELINE} />
        </MumbleCard>
      ))}

      {posts.count > 10 && <MumbleInfinityPosts olderThan={posts.data[0].id} limit={MUMBLE_POSTS_PAGINATION} />}
    </>
  );
};
