"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { useAuthContext } from "@/contexts/AuthProvider";
import { logout as authLogout } from "@/app/lib/actions/auth";
import useWindowWidth from "@/hooks/useWindowWidth";
import useMounted from "@/hooks/useMounted";

import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import StickyHeader from "../StickyHeader";

export type Links = { href: string; label: string }[];
export type LinksObject = {
  type: "user" | "guest";
  links: Links;
};

const guestLinks = [
  { href: "/products", label: "Products" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

const userLinks = [
  { href: "/products", label: "Products" },
  { href: "/products/post", label: "Post product" },
];

export default function Header() {
  const { user, clearAuth } = useAuthContext();
  const { windowWidth } = useWindowWidth();
  const mounted = useMounted();
  const router = useRouter();

  const links = useMemo(() => {
    return user?.email ? userLinks : guestLinks;
  }, [user]);

  async function logout() {
    try {
      clearAuth();
      await authLogout();
    } catch (error: any) {
      // authLogout triggers a redirect which may throw
      console.log(error.message);
    }
  }

  return (
    <StickyHeader className="mx-[10px] mt-2 rounded-xl w-[calc(100%-20px)] flex items-center justify-center bg-new-darkblue">
      <div className="container px-12 sm:px-20 py-3 flex justify-between items-center">
        <Link href={"/"} className="relative logo w-24 h-24">
          <Image
            src="/logo-text.png"
            alt="logo"
            fill={true}
            sizes="(min-width: 1280px) 96px, (min-width: 1024px) 85px,(min-width: 768px) 78px, 72px"
            className="object-contain"
          />
        </Link>
        {mounted && windowWidth < 640 ? (
          <MobileNav links={links} user={user} logout={logout} />
        ) : (
          <DesktopNav links={links} user={user} logout={logout} />
        )}
      </div>
    </StickyHeader >
  );
}
