import ManageProductImages from "@/app/components/product/manage-images";
import { getProductImages } from "@/app/lib/data";
import { cookies } from "next/headers";

export default async function ProductImagesPage({
  params,
}: {
  params: { id: string };
}) {
  const cookie = cookies().toString();

  const product = await getProductImages(params.id, cookie);

  return (
    <section className="flex w-full justify-center md:min-h-screen">
      <div className="container p-4 flex flex-col items-center">
        <ManageProductImages product={product} />
      </div>
    </section>
  );
}
