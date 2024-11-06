import Link from "next/link";

import { ptSerif } from "../layout";
import RegisterForm from "../components/auth/register-form";

export default function RegisterPage() {
  return (
    <div className="container flex justify-center items-start py-5">
      <section className="flex flex-col items-center justify-start w-[85%] sm:w-[80%] md:w-[70%] mdl:w-[60%] lg:w-[50%] xl:w-[45%] mb-8 min-h-[450px] px-3 sm:px-5 py-4">
        <RegisterForm ptSerif={ptSerif} />
        <div className="flex flex-col items-center w-full gap-2 mt-4 border-t-[1px] border-[#6a6a6a]">
          <p className="text-new-mint">or</p>
          <Link
            href="/login"
            className="block py-1 text-lg text-center duration-150 text-new-mint hover:text-new-peach-90"
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
}
