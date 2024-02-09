'use client';
import { DELETE_POST } from '@/utils/api/api-actions-post';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { Icon } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

export const MumbleDelete = ({ post }: { post: TAPIPost | TAPIReply }) => {
  const handleDelete = async () => {
    await DELETE_POST({ id: post.id });
  };

  return (
    <button onClick={handleDelete} className="flex place-items-center gap-xs">
      <Icon variant="cancel" className="fill-error" />
      <span className="text-error">Mumble Löschen</span>
    </button>
  );
};
