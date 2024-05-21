import { ptSerif } from "../layout";

export default function RegisterPage() {
  return (
    <main className="bg-gradient-to-b from-[#03045e] via-[#090b7d] to-[#03045e]">
      <div className="container max-w-[1400px] flex justify-center py-5">
        <section className="register flex flex-col items-center justify-start min-h-[500px] px-5 py-4 rounded-3xl bg-gradient-to-tr from-[#00b4d833] via-[#00b4d811] to-[#00b4d833] w-[40%] border-lightblue border shadow-[0_0_15px_2px_rgba(0,180,216,0.3)]">
          <form
            action="\"
            className="register flex flex-col items-center justify-start gap-8  w-[80%] "
          >
            <div className={`heading pt-8 ${ptSerif.className}`}>
              <h1 className="text-3xl">Register your account</h1>
            </div>
            <div className="input-group w-[80%]">
              <input
                type="text"
                className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none focus:outline-[1px] focus:outline-lightblue"
                placeholder="Email"
              />
            </div>
            <div className="input-group w-[80%]">
              <input
                type="password"
                className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-pink"
                placeholder="Password"
              />
            </div>
            <div className="input-group w-[80%]">
              <input
                type="password"
                className="rounded-md min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-pink"
                placeholder="Repeat password"
              />
            </div>
            <button className="relative w-[80%] py-1 text-xl rounded-md bg-pink text-white after:content-[''] after:absolute after:bottom-[-1em] after:block after:h-[1px] after:bg-gray-200 after:w-[100%]">
              Register
            </button>
          </form>
            <div className="login-redirect flex flex-col items-center w-4/5 gap-2 mt-4">
              <p className="text-white">or</p>
              <a
                href=""
                className="block w-[80%] py-1 text-xl text-center rounded-md bg-lightblue text-white"
              >
                Login
              </a>
            </div>
        </section>
      </div>
    </main>
  );
}
