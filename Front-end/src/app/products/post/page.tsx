import PostProductForm from "@/app/components/product/post-product-form";
import { getBrandsByCategory, getCategories } from "@/app/lib/data";

export default async function PostPage() {
  const categories = await getCategories();

  return (
      <div className="max-w-[1400px] mx-auto p-8">
        <section className="w-full flex flex-col gap-8 items-center">
            <h1>Post your product</h1>
          <PostProductForm categories={categories} />
        </section>
      </div>
  );
}
