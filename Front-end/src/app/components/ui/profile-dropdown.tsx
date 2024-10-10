import { User } from "@/types/User";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export function ProfileDropdown({
  user,
  profileDropdown,
  logout,
  setProfileDropdown
}: {
  user: User;
  profileDropdown: boolean;
  logout: () => void;
  setProfileDropdown: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute right-0 top-full z-10 opacity-100 cursor-auto min-w-40 bg-gray-50 rounded-md px-4 pointer-events-auto ${
        profileDropdown
          ? "min-h-60 py-2 duration-200"
          : "opacity-0 h-0 p-0 overflow-hidden duration-75 pointer-events-none"
      }`}
    >
      <h3 className="relative text-new-midnight-100 font-bold after:absolute after:left-[-1rem] after:top-[calc(100%+0.2rem)] after:h-[1px] after:bg-new-midnight-100 after:w-[calc(100%+2rem)]">
        {user.username}
      </h3>
      <ul className="flex flex-col justify-start pt-2">
        <li className="">
          <Link
            href={"/profile"}
            onClick={(e) => setProfileDropdown(false)}
            className="text-new-midnight-100 text-xl hover:border-pink hover:text-new-darkblue duration-200 cursor-pointer"
          >
            Profile
          </Link>
        </li>
        <li className="">
          <a
            onClick={logout}
            className="text-new-midnight-100 text-xl hover:border-pink hover:text-new-darkblue duration-200 cursor-pointer"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
