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
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#091349",
        },
      }}
    >
      <div className="min-w-32 px-2 text-new-mint">
        <h3 className="relative font-bold after:absolute after:left-[-1rem] after:top-[calc(100%+0.2rem)] after:h-[1px] after:bg-new-mint after:w-[calc(100%+2rem)]">
          {user.username}
        </h3>
        <ul className="flex flex-col justify-start pt-2">
          <li className="">
            <Link
              href={"/profile"}
              onClick={onClose}
              className="hover:text-new-peach-100  text-lg duration-200 cursor-pointer"
            >
              Profile page
            </Link>
          </li>
          <li className="">
            <a
              onClick={logout}
              className="hover:text-new-peach-100  text-lg duration-200 cursor-pointer"
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
