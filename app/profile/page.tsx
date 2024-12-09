"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import defaultBlue from "../../public/images/default-blue.png";

const Profile = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl text-white md:text-6xl">
          Qui regarde ?
        </h1>
        <div className="mt-10 flex items-center justify-center gap-8">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group mx-auto w-44 flex-row">
              <div
                className="
                  flex
                  size-44
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-md
                  border-2
                  border-transparent
                  group-hover:cursor-pointer
                  group-hover:border-white"
              >
                <Image
                  src={defaultBlue}
                  alt="profile"
                  width="300"
                  height="300"
                />
              </div>
              <div className="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
