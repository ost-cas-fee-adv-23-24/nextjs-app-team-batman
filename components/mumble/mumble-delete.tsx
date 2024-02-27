'use client';
import { DELETE_POST } from '@/utils/api/api-actions-post';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { Icon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useSession } from 'next-auth/react';

export const MumbleDelete = ({ post }: { post: TAPIPost | TAPIReply }) => {
  const { data } = useSession();
  const handleDelete = async () => {
    await DELETE_POST({ id: post.id });
  };

  if (!data?.user) return null;
  if (data.user.id !== post.creator.id) return null;
  return (
    <button
      onClick={handleDelete}
      className="flex w-fit place-items-center gap-xs rounded-s bg-accent-100 p-xs mumble-font-label-s"
    >
      <Icon variant="cancel" className="fill-accent-600" size="s" />
      <span className="text-accent-600">Mumble Löschen</span>
    </button>
  );
};
