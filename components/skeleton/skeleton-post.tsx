import { Fragment } from 'react';
import { MumbleCard } from '../mumble/card/mumble-card';
import SkeletonPostContent from './skeleton-post-content';

interface ISkeletonPost {
  count?: number;
}

export default function SkeletonPost({ count = 1 }: ISkeletonPost) {
  const skeleton = (
    <MumbleCard skeleton>
      <SkeletonPostContent />
    </MumbleCard>
  );

  return Array(count)
    .fill(0)
    .map((_, i) => <Fragment key={i}>{skeleton}</Fragment>);
}
