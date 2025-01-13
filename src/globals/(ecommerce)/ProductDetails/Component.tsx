import { Locale } from "@/i18n/config";
import { Product } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import { WithImageGalleryExpandableDetails } from "./variants/WithImageGalleryExpandableDetails";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "./components/Breadcrumbs";

export const ProductDetails = async ({ product }: { product: Product }) => {
  try {
    const locale = (await getLocale()) as Locale;
    const productDetailsData = await getCachedGlobal("productDetails", locale, 1)();

    let ProductDetailsComponent: ReactNode = null;
    switch (productDetailsData.type) {
      case "WithImageGalleryExpandableDetails":
        ProductDetailsComponent = (
          <WithImageGalleryExpandableDetails productSettings={productDetailsData} product={product} />
        );
        break;
    }

    if (!ProductDetailsComponent) {
      notFound();
    }

    return (
      <>
        <Breadcrumbs product={product} />
        {ProductDetailsComponent}
      </>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
};
