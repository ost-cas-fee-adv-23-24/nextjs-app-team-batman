'use client';

import { MumbleCard } from '@/components/mumble/mumble-card';
import { MumblePost } from '@/components/mumble/mumble-post';
import { MUMBLE_USER_INFO_VARIANT } from '@/components/mumble/mumble-user-info';
import { TAPIPost } from '@/utils/api/api-types';
import { PostEvents, getPostEventSource } from '@/utils/route-service';
import { useEffect, useState } from 'react';

export const DashboardLivePosts = () => {
  const [posts, setPosts] = useState<TAPIPost[]>([]);

  useEffect(() => {
    const events = getPostEventSource();
    events.addEventListener(PostEvents.created, (event: MessageEvent<string>) => {
      const post = JSON.parse(event.data) as TAPIPost;
      setPosts([post, ...posts]);
    });
    return () => events.close();
  }, [posts]);

  return (
    <>
      {posts.map((post) => (
        <MumbleCard key={post.id}>
          <MumblePost post={post} variant={MUMBLE_USER_INFO_VARIANT.TIMELINE} />
        </MumbleCard>
      ))}
    </>
  );
};
