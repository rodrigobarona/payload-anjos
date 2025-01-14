import { Locale } from "@/i18n/config";
import { Link } from "@/i18n/routing";
import { Product } from "@/payload-types";
import { formatPrice } from "@/utilities/formatPrices";
import { useTranslations } from "next-intl";
import Image from "next/image";

const WithInlinePrice = ({ products, locale }: { products: Product[]; locale: Locale }) => {
  const t = useTranslations("ProductList");
  return (
    <>
      {products.map(
        (product) =>
          typeof product.images[0] !== "string" && (
            <div key={product.id} className="group relative">
              <Image
                alt={product.images[0].alt}
                src={product.images[0].url ?? ""}
                width={product.images[0].width ?? 512}
                height={product.images[0].height ?? 512}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  {
                    <p className="mt-1 text-sm text-gray-500">
                      {product.enableVariants && product.variants
                        ? `${product.variants.length} ${product.variants.length > 1 ? t("variants-plural") : t("variants-singular")}`
                        : ""}
                    </p>
                  }
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice((product.pricing && product.pricing[0].value) ?? 0, "USD", locale)}
                </p>
              </div>
            </div>
          ),
      )}
    </>
  );
};
export default WithInlinePrice;
