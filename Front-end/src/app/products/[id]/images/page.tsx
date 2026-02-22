import ManageProductImages from "@/app/components/product/manage-images";
import { getProductImages } from "@/app/lib/data/product";

export default async function ProductImagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductImages(id);

  return (
    <section className="flex w-full justify-center md:min-h-screen">
      <div className="container p-4 flex flex-col items-center">
        <ManageProductImages product={product} />
      </div>
    </section>
  );
}
