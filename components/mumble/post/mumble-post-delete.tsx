'use client';
import { DELETE_POST } from '@/utils/api/api-actions-post';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { cn } from '@/utils/tailwind';
import { Icon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const MumblePostDelete = ({ post, goHome }: { post: TAPIPost | TAPIReply; goHome: boolean }) => {
  const { data } = useSession();
  const router = useRouter();
  const handleDelete = async () => {
    await DELETE_POST({ id: post.id });
    if (goHome) router.push(RouteService.page(PAGE_ROUTES.HOME));
  };

  if (!data?.user) return null;
  if (data.user.id !== post.creator.id) return null;
  return (
    <button
      onClick={handleDelete}
      className={cn(
        'flex w-fit place-items-center gap-xs rounded-s p-xs duration-150 mumble-font-label-s ',
        'bg-base-100 fill-base-800 text-base-800',
        'hover:bg-accent-200 hover:fill-accent-800 hover:text-accent-800',
      )}
      data-testid="mumble-post-delete"
    >
      <Icon variant="cancel" size="s" />
      <span>Mumble Löschen</span>
    </button>
  );
};
