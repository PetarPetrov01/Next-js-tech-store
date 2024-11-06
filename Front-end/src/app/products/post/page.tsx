import PostProductForm from "@/app/components/product/post-product-form";
import Banner from "@/app/components/ui/banner";
import { getBrandsByCategory, getCategories } from "@/app/lib/data";

export default async function PostPage() {
  const categories = await getCategories();

  return (
    <div className="w-full flex flex-col items-center">
      <Banner>
        <h1 className="text-black z-[1] uppercase">Post product</h1>
      </Banner>
      <div className="container mx-auto p-8">
        <section className="w-full flex flex-col gap-8 items-center">
          <h1>Post your product</h1>
          <PostProductForm categories={categories} />
        </section>
      </div>
    </div>
  );
}
