/* eslint-disable @typescript-eslint/require-await */
import { LayoutPostWrapper } from '@/components/layout/layout-post-wrapper';
import SkeletonPost from '@/components/skeleton/skeleton-post';
import { Button, Input } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { MUMBLE_POSTS_PAGINATION } from '../app-config';
import { TagPosts } from './_tag-posts';

export default async function Home({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const serverAction = async (formData: FormData) => {
    'use server';
    const searchParams = {
      tag: formData.get('tagsearch') as string,
    };
    redirect(`/tags?tag=${searchParams.tag}`);
  };

  return (
    <div className="grid w-full gap-l">
      <form action={serverAction} className="grid gap-s">
        <Input name="tagsearch" placeholder="suche nach tags! 🚀" />
        <Button type="submit">Suchen</Button>
      </form>

      <LayoutPostWrapper>
        <Suspense fallback={<SkeletonPost count={MUMBLE_POSTS_PAGINATION} />}>
          <TagPosts searchParams={searchParams} />
        </Suspense>
      </LayoutPostWrapper>
    </div>
  );
}
