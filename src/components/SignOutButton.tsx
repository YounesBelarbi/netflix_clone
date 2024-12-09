"use client";

import { signOut } from "next-auth/react";

export const SignOutButton: React.FC = () => {
  return (
    <button className="h-10 w-full bg-white" onClick={() => signOut()}>
      Sign out
    </button>
  );
};

export default SignOutButton;
