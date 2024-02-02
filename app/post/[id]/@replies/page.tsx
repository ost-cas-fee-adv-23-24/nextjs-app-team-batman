import { auth } from '@/app/api/auth/[...nextauth]/auth';
import { Card } from '@/components/card';
import Post from '@/components/post';
import { DELETE_POST, GET_POST_REPLIES } from '@/utils/api/api-service-post';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { Button } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // throw new Error('Not implemented');

  const replies = await GET_POST_REPLIES({ id: params.id });

  const session = await auth();

  const handleDelete = async () => {
    'use server';
    await DELETE_POST({ id: params.id });
    redirect(RouteService.page(PAGE_ROUTES.HOME));
  };
  // const handleLike = async () => {
  //   'use server';
  //   await LIKE_POST({ id: params.id });
  //   revalidatePath(RouteService.route_api(API_ROUTES.POSTS_ID, { id: params.id }));
  // };
  // const handleUnlike = async () => {
  //   'use server';
  //   await UNLIKE_POST({ id: params.id });
  //   revalidatePath(RouteService.route_api(API_ROUTES.POSTS_ID, { id: params.id }));
  // };

  if (replies.count === 0) {
    return <>this post hast no replies...</>;
  }

  return (
    <>
      {/* <div>{JSON.stringify(replies)}</div> */}

      {replies.data.map((post) => (
        <Card key={post.id}>
          <Post post={post} />
        </Card>
      ))}
      {session && (
        <div className="flex gap-m">
          <form action={handleDelete}>
            <Button type="submit" variant="secondary">
              WRITE REPLY POST
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
