import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "board", label: "Board" },
  { href: "register", label: "Register" },
];

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-center ">
        <div className="container max-w-[1400px] px-20 py-3 flex justify-between items-center">
          <div className="logo min-w-[4rem]">
            <p className="text-white text-2xl">Some LOGO</p>
          </div>
          <nav>
            <ul className="flex justify-center gap-4">
              {links.map((link) => (
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
