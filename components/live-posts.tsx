'use client';

import { TAPIPost } from '@/utils/api/api-types';
import { PostEvents, getPostEventSource } from '@/utils/route-service';
import { useEffect, useState } from 'react';
import { Card } from './card/card';
import Post from './post';

export default function LivePosts() {
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
        <Card key={post.id}>
          <Post post={post} />
        </Card>
      ))}
    </>
  );
}
