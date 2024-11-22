import Link from "next/link";

import { User } from "@/types/User";
import { Menu } from "@mui/material";

export function ProfileDropdown({
  user,
  logout,
  onClose,
  anchorEl,
}: {
  user: User;
  logout: () => void;
  onClose: () => void;
  anchorEl: HTMLLIElement | null;
}) {
  const open = Boolean(anchorEl);

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      }}
    >
      <h3 className="relative text-new-midnight-100 font-bold after:absolute after:left-[-1rem] after:top-[calc(100%+0.2rem)] after:h-[1px] after:bg-new-midnight-100 after:w-[calc(100%+2rem)]">
            className="text-new-midnight-100 text-xl hover:border-pink hover:text-new-darkblue duration-200 cursor-pointer"
            className="text-new-midnight-100 text-xl hover:border-pink hover:text-new-darkblue duration-200 cursor-pointer"
      <div className="min-w-32 px-2 text-new-mint">
          {user.username}
        </h3>
        <ul className="flex flex-col justify-start pt-2">
          <li className="">
            <Link
              href={"/profile"}
              onClick={onClose}
            >
              Profile page
            </Link>
          </li>
          <li className="">
            <a
              onClick={logout}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </Menu>
  );
}

export default ProfileDropdown;
