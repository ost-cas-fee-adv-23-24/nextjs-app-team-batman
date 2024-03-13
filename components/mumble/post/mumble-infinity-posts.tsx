'use client';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { TAPIPost } from '@/utils/api/api-types';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import SkeletonPost from '../../skeleton/skeleton-post';
import { MumbleCard } from '../card/mumble-card';
import { MumblePost } from './mumble-post';

export type TInfinityPostsProps = {
  olderThan: string;
  limit: number;
  creators?: string[];
  likedBy?: string[];
};

export const MumbleInfinityPosts = ({ olderThan, limit, creators, likedBy }: TInfinityPostsProps) => {
  const [offset, setOffset] = useState<number>(limit);
  const [posts, setPosts] = useState<TAPIPost[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const { ref, inView } = useInView();
  const currentScroll = useRef(0);

  useEffect(() => {
    const loadMorePosts = async () => {
      setLoading(true);
      try {
        const apiPosts = await Promise.all([
          GET_POSTS({ query: { olderThan, offset, limit, creators, likedBy } }),
          delay(),
        ]).then((results) => results[0]);

        const newValue = !posts ? apiPosts.data : [...posts, ...apiPosts.data];

        if (newValue.length + limit >= apiPosts.count) {
          setLimitReached(true);
        }
        currentScroll.current = window.scrollY;
        setPosts(newValue);
        setOffset(offset + limit);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (inView && !limitReached && !loading && currentScroll.current !== window.scrollY) {
      void loadMorePosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <>
      {posts?.map((post, i) => (
        <div key={post.id} ref={i === posts.length - 1 ? ref : undefined}>
          <MumbleCard imageSrc={post.creator?.avatarUrl ?? undefined} post={post}>
            <MumblePost post={post} variant={MUMBLE_VARIANT.TIMELINE} />
          </MumbleCard>
        </div>
      ))}

      {!limitReached ? (
        <>
          {loading && <SkeletonPost count={3} />}
          <div ref={ref} />
        </>
      ) : (
        <p className="grid place-content-center rounded-s bg-base-200 p-xs text-base-600">
          ab hier sind keine weiteren Mumbles verfügbar 👋
        </p>
      )}
    </>
  );
};
