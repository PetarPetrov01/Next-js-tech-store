import Image from "next/image";
import Link from "next/link";

const guestLinks = [
  { href: "/", label: "HOME" },
  { href: "about", label: "ABOUT" },
  { href: "contact", label: "CONTACT US" },
  { href: "login", label: "LOGIN" },
  { href: "register", label: "REGISTER" },
];

const employyLinks = [
  { href: "/", label: "HOME" },
  { href: "look-for-job", label: "LOOK FOR JOB" },
  { href: "create-job", label: "CREATE JOB" },
  { href: "about", label: "ABOUT US" },
  { href: "contact", label: "CONTACT US" },
  { href: "profile", label: "PROFILE" },
]

const companyLinks = [
  { href: "/", label: "HOME" },
  { href: "create", label: "CREATE JOBS" },
  { href: "questionannaires", label: "CREATE QUESTIONNAIRES" },
  { href: "contact", label: "MY STUFF" },
  { href: "cv", label: "CV LIBRARY" },
  { href: "profile", label: "PROFILE" },
]

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-center ">
        <div className="container max-w-[1400px] px-20 py-3 flex justify-between items-center">
          <div className="logo min-w-[4rem]">
            <Image src='/hr-logo.png' alt="logo" width={120} height={120}/>
          </div>
          <nav>
            <ul className="flex justify-center gap-4">
              {guestLinks.map((link) => (
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
