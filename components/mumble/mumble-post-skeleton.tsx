interface IPostSkeleton {
  skeletons?: number;
}

export default function PostSkeleton({ skeletons = 1 }: IPostSkeleton) {
  const skeleton = (
    <div className="relative h-fit w-full items-center rounded-m bg-white px-xl py-l">
      <div className="absolute left-[-30px] top-m grid h-[60px] w-[60px]  rounded-full border-[6px] border-base-100 bg-base-100">
        <div className="animate-pulse rounded-full bg-base-200">&nbsp;</div>
      </div>
      <div className="pb-m">
        <div className="mb-m w-4/12 animate-pulse rounded-s bg-base-200 pb-m">&nbsp;</div>
        <div className="">
          <div className="mb-s w-full animate-pulse rounded-s bg-base-200">&nbsp;</div>
          <div className="mb-m w-10/12  animate-pulse rounded-s bg-base-200">&nbsp;</div>
          <div className="w-7/12 animate-pulse  rounded-s bg-base-200">&nbsp;</div>
        </div>
      </div>
    </div>
  );
  const renderSkeletons = [];
  for (let i = 0; i < skeletons; i++) {
    renderSkeletons.push(skeleton);
  }

  return renderSkeletons;
}
