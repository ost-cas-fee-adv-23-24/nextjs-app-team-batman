import { auth } from '@/app/api/auth/[...nextauth]/auth';
import Post from '@/components/post';
import { decodeULIDTimestamp } from '@/utils/api/api-helpers';
import { APIError } from '@/utils/api/api-service-base';
import { CREATE_POST_LIKE, DELETE_POST, DELETE_POST_LIKE, GET_POST_BY_ID } from '@/utils/api/api-service-post';
import { API_ROUTES, PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const post = await GET_POST_BY_ID({ id: params.id });

    const session = await auth();

    const handleDelete = async () => {
      'use server';
      await DELETE_POST({ id: params.id });
      redirect(RouteService.page(PAGE_ROUTES.HOME));
    };
    const handleLike = async () => {
      'use server';
      await CREATE_POST_LIKE({ id: params.id });
      revalidatePath(RouteService.api(API_ROUTES.POSTS_ID, { id: params.id }));
    };
    const handleUnlike = async () => {
      'use server';
      await DELETE_POST_LIKE({ id: params.id });
      revalidatePath(RouteService.api(API_ROUTES.POSTS_ID, { id: params.id }));
    };

    return (
      <div className="overflow-auto">
        <div>id: {post.id}</div>
        <div>created: {decodeULIDTimestamp(post.id).toLocaleDateString()}</div>
        <div className="overflow-auto">creator: {JSON.stringify(post.creator)}</div>
        <div>likes: {post.likes}</div>
        <div>likedBySelf: {JSON.stringify(post.likedBySelf)}</div>
        <div>mediaType: {post.mediaType}</div>
        <div>text: {post.text}</div>
        <div>replies: {post.replies}</div>
        <div>mediaUrl: {post.mediaUrl}</div>

        <Post post={post} />

        <div className="flex gap-m">
          {session?.user?.id === post.creator.id && (
            <form action={handleDelete}>
              <Button type="submit" variant="secondary">
                DELETE POST
              </Button>
            </form>
          )}
          <form action={handleLike}>
            <Button type="submit" variant="secondary">
              ❤️LIKE POST
            </Button>
          </form>
          <form action={handleUnlike}>
            <Button type="submit" variant="secondary">
              💔 UNLIKE POST
            </Button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      return notFound();
    }
    throw error;
  }
}
