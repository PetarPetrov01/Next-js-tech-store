import { User } from "@/types/User";
import Link from "next/link";

export function ProfileDropdown({
  user,
  profileDropdown,
  logout,
}: {
  user: User;
  profileDropdown: boolean;
  logout: () => void;
}) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`absolute right-0 top-[105%] min-w-40 min-h-60 bg-gray-50 rounded-md px-4 py-2 duration-150 pointer-events-auto ${
        profileDropdown
          ? ""
          : "opacity-0 duration-200 pointer-events-none top-[95%]"
      }`}
    >
      <h3 className="relative text-new-teal font-bold after:absolute after:left-[-1rem] after:top-[calc(100%+0.2rem)] after:h-[1px] after:bg-new-teal after:w-[calc(100%+2rem)]">
        {user.username}
      </h3>
      <ul className="flex flex-col justify-start pt-2">
        <li className="">
          <Link
            href={"/profile"}
            className="text-new-teal text-xl hover:border-pink hover:text-new-gray duration-200 cursor-pointer"
          >
            Profile
          </Link>
        </li>
        <li className="">
          <a
            onClick={logout}
            className="text-new-teal text-xl hover:border-pink hover:text-new-gray duration-200 cursor-pointer"
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropdown;
