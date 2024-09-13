import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gradient-radial from-new-teal to-new-gray min-h-[90vh] flex justify-center">
      <div className="container max-w-[1400px] px-40">
        <section className="left flex items-center justify-around gap-4 max-w-[100%] pt-20">
          <article className="flex flex-col max-w-[60%] w-[65ch]">
            {/* <h1 className="text-5xl text-new-sandstone [text-shadow:_0_0_25px_rgb(0_180_216_/0.5)]"> */}
            <h1 className="text-5xl text-new-peach-100">
              Welcome to Tech Store
            </h1>
            <p className="text-white text-2xl">
              Find the tech you are looking for.{" "}
            </p>
            <p className="text-white text-2xl">Start your journey now!</p>
            <div className="links w-[100%] flex gap-4 mt-8">
              {/* <a href="" className="px-10 py-2 bg-lightblue rounded-3xl text-white text-lg shadow-lg shadow-cyan-500/40">Services</a> */}
              {/* <a href="" className="px-10 py-2 bg-pink rounded-3xl text-white text-lg shadow-lg shadow-rose-500/40">Contact us</a> */}
              <a
                href=""
                className="px-10 py-2 bg-new-peach-100 rounded-3xl text-white text-lg shadow-[0_4px_12px_2px_rgba(255,203,154,0.4)] hover:shadow-[0_2px_12px_3px_rgba(255,203,154,0.7)] duration-200"
              >
                Services
              </a>
              <a
                href=""
                className="px-10 py-2 text-new-gray bg-new-mint rounded-3xl text-lg shadow-[0_4px_12px_2px_rgba(209,232,226,0.4)] hover:shadow-[0_2px_12px_3px_rgba(209,232,226,0.7)] duration-200"
              >
                Contact us
              </a>
            </div>
          </article>
          <article className="max-w-[35%] aspect-square">
            <Image src="/basket.png" width={380} height={380} alt="HR logo" />
          </article>
        </section>
      </div>
    </main>
  );
}
