import Link from "next/link";
import { ptSerif } from "../layout";
import LoginForm from "../ui/login-form";

export default function LoginPage() {
  return (
    <main className="bg-gradient-radial from-new-teal to-new-gray">
      <div className="container max-w-[1400px] flex justify-center py-5">
        <section className="register flex flex-col items-center mb-8 justify-start min-h-[450px] px-5 py-4 rounded-3xl bg-gradient-to-tr from-[#d1e8e222] via-[#d1e8e211] to-[#d1e8e222] w-[40%] border-new-mint border shadow-[0_0_15px_2px_rgba(0,180,216,0.3)]">
          <LoginForm ptSerif={ptSerif} />
          <div className="login-redirect flex flex-col items-center w-4/5 gap-2 mt-4">
            <p className="text-white">or</p>
            <Link
              href="/register"
              className="block w-[80%] py-1 text-xl text-center rounded-md bg-new-peach-100 border-[1px] duration-150 border-new-peach text-new-gray hover:border-white"
            >
              Register
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
