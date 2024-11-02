import RegisterForm from "../components/auth/register-form";

import { ptSerif } from "../layout";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="bg-gradient-radial from-new-midnight to-new-darkblue">
      <div className="container max-w-[1400px] flex justify-center py-5">
        <section className="register flex flex-col items-center w-[80%] sm:w-[70%] md:w-[55%] mdl:w-[40%] mb-8 justify-start min-h-[500px] px-5 py-4 rounded-3xl bg-gradient-to-tr from-[#ffcB9a22] via-[#ffcB9a11] to-[#ffcB9a22] border-new-peach border shadow-[0_0_15px_2px_rgba(255,203,154,0.3)]">
          <RegisterForm ptSerif={ptSerif} />
          <div className="login-redirect flex flex-col items-center w-4/5 gap-2 mt-4">
            <p className="text-white">or</p>
            <Link
              href="/login"
              className="block w-[80%] py-1 text-xl text-center rounded-md bg-new-mint text-new-darkblue border-[1px] duration-150 border-new-mint hover:border-new-peach"
            >
              Login
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
