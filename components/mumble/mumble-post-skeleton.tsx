export default function PostSkeleton() {
  return (
    <div className="relative h-fit w-full items-center rounded-m bg-white px-xl py-l">
      <div className="absolute left-[-30px] top-m h-[60px] w-[60px] animate-skeleton rounded-full border-[6px] border-base-100">
        &nbsp;
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
