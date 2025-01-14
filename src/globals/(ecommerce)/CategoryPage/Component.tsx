import { Product, ProductCategory } from "@/payload-types";
import { ProductListing } from "../ProductList/Component";

export const CategoryListing = ({
  products,
  category,
}: {
  products: Product[];
  category: ProductCategory;
}) => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{category.title}</h2>
          <ProductListing products={products} />
        </div>
      </div>
    </>
  );
};
