import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { MUMBLE_USER_INFO_VARIANT, MumblePost } from '@/components/mumble';
import { DELETE_POST, GET_POST_BY_ID, MUMBLE_LIKE_HANDLER } from '@/utils/api/api-actions-post';
import { APIError } from '@/utils/api/api-service-base';
import { MUMBLE_LIKE_TYPE } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
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
      await MUMBLE_LIKE_HANDLER({ id: params.id, type: MUMBLE_LIKE_TYPE.LIKE });
    };

    const handleDisklike = async () => {
      'use server';
      await MUMBLE_LIKE_HANDLER({ id: params.id, type: MUMBLE_LIKE_TYPE.DISLIKE });
    };

    return (
      <div>
        <MumblePost post={post} variant={MUMBLE_USER_INFO_VARIANT.DETAILVIEW} />

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
          <form action={handleDisklike}>
            <Button type="submit" variant="secondary">
              💔 UNLIKE POST
            </Button>
          </form>
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof APIError && error.status === 404) return notFound();

    throw error;
  }
}
