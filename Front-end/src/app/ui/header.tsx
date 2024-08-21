"use client";
import { useAuthContext } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProfileDropdown from "./profile-dropdown";

const guestLinks = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/login", label: "LOGIN" },
  { href: "/register", label: "REGISTER" },
];

const employyLinks = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/create", label: "POST PRODUCT" },
];

export default function Header() {
  const { user, clearAuth } = useAuthContext();
  const [profileDropdown, setProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: Event) => {
    console.log(dropdownRef.current);
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setProfileDropdown(false);
    }
  };

  useEffect(() => {
    if (profileDropdown) {
      document.addEventListener("pointerdown", handleOutsideClick);
    } else {
      document.removeEventListener("pointerdown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [profileDropdown]);

  function logout() {
    console.log("Clear");
    clearAuth();
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
              {user?.email && (
                <div
                  ref={dropdownRef}
                  onClick={toggleProfileDropdown}
                  className="flex items-center gap-2 relative text-white text-lg mx-3 py-1 "
                >
                  <ProfileDropdown
                    user={user}
                    profileDropdown={profileDropdown}
                    logout={logout}
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
                </div>
              )}
              {user?.email
                ? employyLinks.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-white text-lg px-3 py-1 hover:border-pink hover:text-lightblue duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))
                : guestLinks.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-white text-lg px-3 py-1 hover:border-pink hover:text-lightblue duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
