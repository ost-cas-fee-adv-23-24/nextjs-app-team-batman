import { MUMBLE_POSTS_PAGINATION } from '@/app/app-config';
import { LayoutPostWrapper } from '@/components/layout/layout-post-wrapper';
import { MumbleCard } from '@/components/mumble/card/mumble-card';
import { MumbleInfinityPosts } from '@/components/mumble/post/mumble-infinity-posts';
import { MumblePost } from '@/components/mumble/post/mumble-post';
import { GET_POSTS } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { MUMBLE_VARIANT } from '@/utils/enums';
import { delay } from '@/utils/helpers/delay';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    return <LayoutPostWrapper>test abc</LayoutPostWrapper>;
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();
    throw error;
  }
}
