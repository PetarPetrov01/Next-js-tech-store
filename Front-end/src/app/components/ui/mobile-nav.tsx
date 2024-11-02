import { Drawer } from "@mui/material";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Links, LinksObject } from "./header";
import { useAuthContext } from "@/contexts/AuthProvider";
import { User } from "@/types/User";
import Link from "next/link";
import Image from "next/image";
import Cart from "../cart/cart";

export default function MobileNav({
  links,
  logout,
  user,
}: {
  links: Links;
  logout: () => Promise<void>;
  user: User | null;
}) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  console.log(user);

  return (
    <>
      <div className="flex gap-2 items-center">
        <Link href={"/cart"}>
          <Cart size="2.2em" />
        </Link>
        <button
          onClick={() => setOpenDrawer(true)}
          className="p-2 w-14 h-14 rounded-full bg-new-midnight-80"
        >
          <IoMenu className="w-full h-full" />
        </button>
      </div>
      <Drawer open={openDrawer} onClose={closeDrawer} anchor="right">
        <nav className="w-[250px] flex h-full p-6 bg-new-midnight-100 ">
          <ul className="w-full flex flex-col gap-4 text-new-mint">
            <>
              {user?.email && (
                <li className="relative flex items-center gap-2 cursor-pointer overflow-hidden text-new-mint text-lg whitespace-nowrap mx-3 py-1 ">
                  <div className="flex-[0_0_40px] relative aspect-square h-auto rounded-full overflow-hidden flex justify-center items-center">
                    <Image
                      src={user.image || "/default-profile.jpg"}
                      alt={user.email}
                      fill={true}
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-2xl overflow-hidden text-ellipsis">
                    {user.username}
                  </p>
                </li>
              )}
              {links.map((link, i) => (
                <li key={i + link.href} className="pl-2">
                  <Link
                    onClick={closeDrawer}
                    href={link.href}
                    className="text-white text-xl px-3 py-1 hover:text-new-peach-90 duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {user?.email && (
                <li className="pl-2 mt-2 pt-4 border-t-[1px] border-new-mint">
                  <a onClick={logout} className="px-3 text-xl cursor-pointer">Logout</a>
                </li>
              )}
            </>
          </ul>
        </nav>
      </Drawer>
    </>
  );
}
