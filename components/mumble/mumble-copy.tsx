'use client';
import { TAPIPost, TAPIReply } from '@/utils/api/api-types';
import { PAGE_ROUTES, RouteService } from '@/utils/route-service';
import { CopyButton } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';
import { useEffect, useState } from 'react';

export const MumbleCopy = ({ post }: { post: TAPIPost | TAPIReply }) => {
  const [textToCopy, setTextToCopy] = useState<string>('');

  useEffect(() => {
    setTextToCopy(window.location.origin + RouteService.page(PAGE_ROUTES.POSTS, { id: post.id }));
  }, [post]);

  return <CopyButton textToCopy={textToCopy} />;
};
