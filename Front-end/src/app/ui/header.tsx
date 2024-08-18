"use client";
import { useAuthContext } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";

const guestLinks = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/login", label: "LOGIN" },
  { href: "/register", label: "REGISTER" },
];

const employyLinks = [
  { href: "/products", label: "PRODUCTS" },
  { href: "/create", label: "POST PRODUCT" },
  { href: "/profile", label: "PROFILE" },
];

export default function Header() {
  const { user, clearAuth } = useAuthContext();

  function logout() {
    console.log("Clear");
    clearAuth();
  }

  return (
    <>
      <header className="flex items-center justify-center ">
        <div className="container max-w-[1400px] px-20 py-3 flex justify-between items-center">
          <div className="logo min-w-[4rem]">
            <Image src="/logo-text.png" alt="logo" width={110} height={110} />
          </div>
          <nav>
            <ul className="flex justify-center gap-4 items-center">
              {user?.email && (
                <li className="flex items-center gap-2 text-white text-lg px-3 py-1">
                  <div className="rounded-full overflow-hidden flex justify-center items-center">
                    <Image src={user.image || '/default-profile.jpg'} width={40} height={40} alt={user.email} className="aspect-square object-cover"/>
                  </div>
                  <p className="text-lg">PROFILEE</p>
                </li>
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
              {user?.email && (
                <li>
                  <a
                    onClick={logout}
                    className="text-white text-lg px-3 py-1 hover:border-pink hover:text-lightblue duration-200 cursor-pointer"
                  >
                    LOGOUT
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
