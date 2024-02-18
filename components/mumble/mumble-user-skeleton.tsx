export default function UserSkeleton() {
  return (
    <div>
      <div className="relative mb-m h-[320px] w-full animate-pulse items-center rounded-m bg-white px-xl py-l">
        <div className="absolute bottom-[-70px] right-[30px] grid h-[150px] w-[150px] rounded-full border-[6px] border-base-100 bg-base-100">
          <div className="animate-pulse rounded-full bg-base-200">&nbsp;</div>
        </div>
      </div>
      <div className="mb-m w-4/12 animate-pulse rounded-s bg-base-200 pb-m pt-m">&nbsp;</div>
      <div className="mb-m w-10/12  animate-pulse rounded-s bg-base-200">&nbsp;</div>
    </div>
  );
}
