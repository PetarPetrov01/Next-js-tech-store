import { Metadata } from "next";
import { getProds } from "../lib/data";

export const metadata: Metadata = {
  title: "About",
};

export default async function Page() {
  const prods = await getProds();

  return (
    <main>
      <section className="flex "></section>
      <div className="container max-w-[1400px] flex justify-center py-5">
        <div className="flex items-center">
          <article className="flex flex-col items-center">
            <h2 className="text-4xl">Our prods</h2>
            <div className="flex flex-col items-center gap-6 min-w-[1000px]">
              {prods.map((prod) => (
                <div
                  key={prod._id}
                  className="flex flex-col w-[70%] justify-center gap-2 mt-8 border-[1px] border-lightblue text-lightblue p-3 rounded-lg  bg-blue-700/30 shadow-s shadow-[0_2px_15px_2px_rgba(0,180,216,0.4)]"
                >
                  <div>
                    <h2 className="text-3xl">{prod.name}</h2>
                  </div>
                  <h2>{prod.category.join(', ')}</h2>
                  <h2>{prod.color}</h2>
                  <p>{prod.description} </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
