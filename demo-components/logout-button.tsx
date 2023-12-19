'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    <button onClick={() => signOut()} className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
      Logout
    </button>
  );
}
