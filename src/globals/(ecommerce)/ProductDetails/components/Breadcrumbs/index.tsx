import { Link } from "@/i18n/routing";
import { Product } from "@/payload-types";

export const Breadcrumbs = ({ product }: { product: Product }) => {
  return (
    <>
      {product.categoriesArr && (
        <nav aria-label="Breadcrumb" className="container mr-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <ol role="list" className="flex items-center space-x-4">
            {product.categoriesArr.map(
              (breadcrumb) =>
                typeof breadcrumb.category !== "string" && (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <Link
                        href={`/category/${breadcrumb.category.slug}`}
                        className="mr-4 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.category.title}
                      </Link>
                      <svg viewBox="0 0 6 20" aria-hidden="true" className="h-5 w-auto text-gray-300">
                        <path d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z" fill="currentColor" />
                      </svg>
                    </div>
                  </li>
                ),
            )}
            <li className="text-sm">
              <Link
                href={`/products/${product.slug}`}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </Link>
            </li>
          </ol>
        </nav>
      )}
    </>
  );
};
