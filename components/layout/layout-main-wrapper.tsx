import { ReactNode } from 'react';

export const LayoutMainWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid w-full place-items-center items-start px-s py-xl">
      <div className="flex w-full max-w-content place-content-center">{children}</div>
    </main>
  );
};
