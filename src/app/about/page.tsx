import { getProds } from "../lib/data";

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
                  className="flex w-[70%] justify-center gap-4 mt-8 border-[1px] border-purple py-2 px-2 rounded-lg "
                >
                  <div>
                    {/* <Image src={prod.image} alt={prod.name} width={200} height={200}/>
                     */}
                    <h2 className="text-3xl">{prod.name}</h2>
                  </div>
                  <h2>{prod.category}</h2>
                  <h2>{prod.color}</h2>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
