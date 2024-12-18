import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();
  if (!visible) {
    return null;
  }
  return (
    <div className="absolute right-0 top-14 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
      <div className="flex flex-col gap-3">
        <div className="group/item flex w-full flex-row items-center gap-3 px-3">
          <Image
            className="rounded-md"
            src="/images/default-blue.png"
            alt="Profile"
            width={24}
            height={24}
          />
          <p className="text-sm text-white group-hover/item:underline">
            {user?.name}
          </p>
        </div>
        <hr className="my-4 h-px border-0 bg-gray-600" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-sm text-white hover:underline"
        >
          Se déconnecter
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
