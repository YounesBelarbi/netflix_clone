"use client";
import SignOutButton from "@/components/SignOutButton";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Home() {
  const { data: user } = useCurrentUser();
  console.log("🚀 ~ Home ~ curretnUser:", user);

  return (
    <>
      <h1 className="text-3xl text-green-500">netflix</h1>;
      <p className="text-white">{user?.name}</p>
      <SignOutButton />
    </>
  );
}
