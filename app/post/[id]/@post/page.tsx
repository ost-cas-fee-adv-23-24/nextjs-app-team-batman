import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { APIError } from '@/utils/api/api-service-base';
import { DELETE_POST, GET_POST_BY_ID, LIKE_POST, UNLIKE_POST } from '@/utils/api/api-service-post';
import { ULID_TO_DATE } from '@/utils/api/helpers';
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
      redirect(RouteService.route_page(PAGE_ROUTES.HOME));
    };
    const handleLike = async () => {
      'use server';
      await LIKE_POST({ id: params.id });
      revalidatePath(RouteService.route_api(API_ROUTES.POSTS_ID, { id: params.id }));
    };
    const handleUnlike = async () => {
      'use server';
      await UNLIKE_POST({ id: params.id });
      revalidatePath(RouteService.route_api(API_ROUTES.POSTS_ID, { id: params.id }));
    };

    return (
      <div className="overflow-auto">
        <div>id: {post.id}</div>
        <div>id (ULID) to date: {ULID_TO_DATE(post.id).toLocaleDateString()}</div>
        <div className="overflow-auto">creator: {JSON.stringify(post.creator)}</div>
        <div>likes: {post.likes}</div>
        <div>likedBySelf: {post.likedBySelf}</div>
        <div>mediaType: {post.mediaType}</div>
        <div>text: {post.text}</div>
        <div>replies: {post.replies}</div>
        <div>mediaUrl: {post.mediaUrl}</div>

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
