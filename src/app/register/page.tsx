import { ptSerif } from "../layout";

export default function RegisterPage() {
  return (
    <main>
      <section className="register flex justify-center items-center">
        <div className="container max-w-[1400px] flex justify-center py-5">
          <form
            action="\"
            className="register flex flex-col items-center justify-start gap-10 min-h-[500px] px-5 py-4 rounded-3xl bg-gradient-to-tr from-[#00b4d866] via-[#00b4d88a] to-[#00b4d866] w-[40%] border-lightblue border"
          >
            <div className={`heading pt-8 ${ptSerif.className}`} >
              <h1 className="text-3xl">Register your account</h1>
            </div>
            <div className="input-group w-[80%]">
              <input type="text" className="rounded-sm min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none "/>
            </div>
            <div className="input-group w-[80%]">
              <input type="password" className="rounded-sm min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none "/>
            </div>
            <div className="input-group w-[80%]">
              <input type="password" className="rounded-sm min-h-9 w-[100%] text-lg border-0 px-3 focus:outline-none "/>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
