"use client";
import { useAuthContext } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProfileDropdown from "./profile-dropdown";
import useCartStore from "../../store/cart";

const guestLinks = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/login", label: "LOGIN" },
  { href: "/register", label: "REGISTER" },
];

const userLinks = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/create", label: "POST PRODUCT" },
];

export default function Header() {
  const { user, clearAuth } = useAuthContext();
  const { cart } = useCartStore();

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

  async function logout() {
    try {
      const res = await fetch("http://localhost:3001/api/auth/logout", {
        credentials: "include",
        cache: "no-cache",
      });

      if (res.ok) {
        const result = await res.json();
        clearAuth();
      } else {
        throw new Error(await res.json());
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const toggleProfileDropdown = () => {
    setProfileDropdown((state) => !state);
  };

  return (
    <>
      <header className="flex items-center justify-center ">
        <div className="container max-w-[1400px] px-20 py-3 flex justify-between items-center">
          <Link href={"/"} className="logo min-w-[4rem]">
            <Image src="/logo-text.png" alt="logo" width={110} height={110} />
          </Link>
          <nav>
            <ul className="flex justify-center gap-4 items-center">
              {user?.email ? (
                <>
                  <li>
                    <p>{cart.length}</p>
                  </li>
                  {userLinks.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-white text-lg px-3 py-1 hover:border-pink hover:text-lightblue duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

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
                    <p className="text-lg hover:text-lightblue duration-200">
                      PROFILE
                    </p>
                  </li>
                </>
              ) : (
                guestLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-white text-lg px-3 py-1 hover:border-pink hover:text-lightblue duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
