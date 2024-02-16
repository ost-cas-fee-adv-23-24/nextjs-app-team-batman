import { AVATAR_SKELETON } from '@/utils/avatar-fallback';
import { Avatar } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

export default function PostSkeleton() {
  return (
    <div className="relative h-fit w-full items-center rounded-m bg-white px-xl py-l">
      <div className="absolute left-[-30px] top-m animate-skeleton rounded-full">
        <Avatar size="m" image={{ alt: '', src: AVATAR_SKELETON, width: 100, height: 100 }} />
      </div>
      <div className="pb-m">
        <div className="mb-m w-4/12 animate-skeleton rounded-s pb-m">&nbsp;</div>
        <div className="">
          <div className="mb-s w-full animate-skeleton rounded-s">&nbsp;</div>
          <div className="mb-m w-10/12 animate-skeleton rounded-s">&nbsp;</div>
          <div className="w-7/12 animate-skeleton rounded-s">&nbsp;</div>
        </div>
      </div>
    </div>
  );
}
