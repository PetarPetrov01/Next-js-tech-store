import PostProductForm from "@/app/components/product/post-product-form";
import Banner from "@/app/components/ui/banner";
import { getCategories, getProduct } from "@/app/lib/data";

export default async function EditPage({ params }: { params: { id: string } }) {
  const categories = await getCategories();
  const product = await getProduct(params.id);

  return (
    <div className="w-full flex flex-col items-center">
      <Banner>
        <h1 className="text-black z-[1] uppercase">Edit product</h1>
      </Banner>
      <div className="container mx-auto p-8">
        <section className="w-full flex flex-col gap-8 items-center">
          <h1>Edit your product</h1>
          <PostProductForm categories={categories} product={product} />
        </section>
      </div>
    </div>
  );
}
