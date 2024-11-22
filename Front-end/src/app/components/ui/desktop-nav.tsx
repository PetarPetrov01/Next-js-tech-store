import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import ProfileDropdown from "../profile/profile-dropdown";
import { Links } from "./header";
import Cart from "../cart/cart";

import { User } from "@/types/User";

export default function DesktopNav({
  links,
  logout,
  user,
}: {
  links: Links;
  logout: () => Promise<void>;
  user: User | null;
}) {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLLIElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchorEl(null);
  };

  const onLogoutClick = () => {
    setMenuAnchorEl(null);
    logout();
  };

  return (
    <nav>
      <ul className="flex justify-center gap-4 items-center">
        <>
          {links.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className="text-white uppercase text-lg px-3 py-1 hover:text-new-peach-90 duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {user?.email && (
            <>
              <ProfileDropdown
                user={user}
                onClose={handleClose}
                anchorEl={menuAnchorEl}
                logout={onLogoutClick}
              />
              <li
                className="flex items-center gap-2 cursor-pointer relative text-white text-lg mx-3 py-1 "
                onClick={handleClick}
              >
                <div className="rounded-full overflow-hidden flex justify-center items-center">
                  <Image
                    src={user.image || "/default-profile.jpg"}
                    width={40}
                    height={40}
                    alt={user.email}
                    className="aspect-square object-cover"
                  />
                </div>
              </li>
              <li className="flex items-center cursor-pointer text-white text-lg mx-3 py-1">
                <Cart size="1.9em" />
                <Link
                  href={"/cart"}
                  className="text-white text-lg py-1 hover:text-new-peach-90 duration-200"
                >
                  CART
                </Link>
              </li>
            </>
          )}
        </>
      </ul>
    </nav>
  );
}
