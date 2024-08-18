'use client'
import { useAuthContext } from "@/contexts/AuthProvider";
import Image from "next/image";
import Link from "next/link";

const guestLinks = [
  { href: "/", label: "HOME" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/contact", label: "CONTACT US" },
  { href: "/login", label: "LOGIN" },
  { href: "/register", label: "REGISTER" },
];

const employyLinks = [
  { href: "/", label: "HOME" },
  { href: "/look-for-job", label: "LOOK FOR JOB" },
  { href: "/create-job", label: "CREATE JOB" },
  { href: "/products", label: "PRODUCTS" },
  { href: "/contact", label: "CONTACT US" },
  { href: "/profile", label: "PROFILE" },
];

const companyLinks = [
  { href: "/", label: "HOME" },
  { href: "/create", label: "CREATE JOBS" },
  { href: "/questionannaires", label: "CREATE QUESTIONNAIRES" },
  { href: "/contact", label: "MY STUFF" },
  { href: "/cv", label: "CV LIBRARY" },
  { href: "/profile", label: "PROFILE" },
];

export default function Header() {
  const { user, clearAuth } = useAuthContext();

  function logout(){
    console.log('Clear')
    clearAuth()
  }

  return (
    <>
      <header className="flex items-center justify-center ">
        <div className="container max-w-[1400px] px-20 py-3 flex justify-between items-center">
          <div className="logo min-w-[4rem]">
            <Image src="/logo-text.png" alt="logo" width={110} height={110} />
          </div>
          <nav>
            <ul className="flex justify-center gap-4">
              {user?.email
                ? (employyLinks.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-white text-lg px-3 py-1 hover:border-pink hover:text-lightblue duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))
                )
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
                  {user?.email && <li>
                    <a onClick={logout} className="text-white text-lg px-3 py-1 hover:border-pink hover:text-lightblue duration-200 cursor-pointer">LOGOUT</a>
                  </li>}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
