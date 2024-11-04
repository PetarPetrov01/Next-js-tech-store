import Link from "next/link";
import ProfileDropdown from "../profile/profile-dropdown";
import Cart from "../cart/cart";
import { Links } from "./header";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  const handleOutsideClick = (event: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setProfileDropdown(false);
    }
  };

  useEffect(() => {
    if (profileDropdown) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [profileDropdown]);

  const toggleProfileDropdown = () => {
    setProfileDropdown((state) => !state);
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
              <li
                ref={dropdownRef}
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 cursor-pointer relative text-white text-lg mx-3 py-1 "
              >
                <ProfileDropdown
                  user={user}
                  profileDropdown={profileDropdown}
                  logout={logout}
                  setProfileDropdown={setProfileDropdown}
                />
                <div className="rounded-full overflow-hidden flex justify-center items-center">
                  <Image
                    src={user.image || "/default-profile.jpg"}
                    width={40}
                    height={40}
                    alt={user.email}
                    className="aspect-square object-cover"
                  />
                </div>
                <p className="text-lg hover:text-new-peach-90 duration-200">
                  PROFILE
                </p>
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
