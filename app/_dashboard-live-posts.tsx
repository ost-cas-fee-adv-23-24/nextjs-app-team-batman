'use client';
import { revalidatePosts } from '@/utils/api/api-actions-post';
import { TAPIPost } from '@/utils/api/api-types';
import { PostEvents, getPostEventSource } from '@/utils/route-service';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const DashboardLivePosts = () => {
  const [posts, setPosts] = useState<TAPIPost[]>([]);
  const [newPostsCount, setNewPostsCount] = useState<number>(0);
  const { data } = useSession();

  useEffect(() => {
    const events = getPostEventSource();
    events.addEventListener(PostEvents.created, (event: MessageEvent<string>) => {
      const post = JSON.parse(event.data) as TAPIPost;
      if (data?.user.id === post.creator.id) return null;
      setPosts([post, ...posts]);
      setNewPostsCount((prev) => prev + 1);
    });
    return () => events.close();
  }, [data?.user.id, posts]);

  const text = newPostsCount === 1 ? `${newPostsCount} neuer Beitrag` : `${newPostsCount} neue Beiträge`;

  const handleClick = () => {
    setNewPostsCount(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {newPostsCount !== 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="fixed inset-x-0 bottom-[24px] z-20 flex justify-center"
          >
            <form
              action={() => {
                revalidatePosts();
                handleClick();
              }}
            >
              <Button variant="secondary" type="submit" size="l">
                {text}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
