export default function Home() {
  return (
    <main className="bg-darkblue min-h-[200px] flex justify-center">
      <div className="container max-w-[1400px] px-40">
        <section className="left flex flex-col max-w-[60%] pt-32 w-[65ch]">
          <h1 className="text-6xl text-lightblue [text-shadow:_0_0_25px_rgb(0_180_216_/0.5)]">Welcome to SmName</h1>
          <p className="text-white text-2xl">
            Find your dream job or the perfect candidate here.{" "}
          </p>
          <p className="text-white text-2xl">Start your journey now!</p>
          <div className="links w-[100%] flex gap-4 mt-8">
            {/* <a href="" className="px-10 py-2 bg-lightblue rounded-3xl text-white text-lg shadow-lg shadow-cyan-500/40">Services</a> */}
            {/* <a href="" className="px-10 py-2 bg-pink rounded-3xl text-white text-lg shadow-lg shadow-rose-500/40">Contact us</a> */}
            <a
              href=""
              className="px-10 py-2 bg-lightblue rounded-3xl text-white text-lg shadow-[0_6px_15px_2px_rgba(0,180,216,0.4)] hover:shadow-[0_2px_18px_4px_rgba(0,180,216,0.7)] duration-200"
            >
              Services
            </a>
            <a
              href=""
              className="px-10 py-2 bg-pink rounded-3xl text-white text-lg shadow-[0_6px_15px_2px_rgba(255,1,152,0.4)] hover:shadow-[0_2px_18px_4px_rgba(255,1,152,0.7)] duration-200"
            >
              Contact us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
