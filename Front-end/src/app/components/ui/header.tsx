"use client";
import { useAuthContext } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import useWindowWidth from "@/hooks/useWindowWidth";
import DesktopNav from "./desktop-nav";
import MobileNav from "./mobile-nav";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const links = useMemo(() => {
    return user?.email ? userLinks : guestLinks;
  }, [user]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  async function logout() {
    try {
      const res = await fetch("http://localhost:3001/api/auth/logout", {
        credentials: "include",
        cache: "no-cache",
      });

      if (res.ok) {
        const result = await res.json();
        clearAuth();
        router.replace("/");
      } else {
        throw new Error(await res.json());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <header className="flex items-center justify-center ">
      <div className="container px-12 sm:px-20 py-3 flex justify-between items-center">
        <Link href={"/"} className="relative logo w-24 h-24">
          <Image
            src="/logo-text.png"
            alt="logo"
            fill={true}
            className="object-contain"
          />
        </Link>
        {hasMounted && windowWidth < 640 ? (
          <MobileNav links={links} user={user} logout={logout} />
        ) : (
          <DesktopNav links={links} user={user} logout={logout} />
        )}
      </div>
    </header>
  );
}
