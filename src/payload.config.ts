import { s3Storage } from "@payloadcms/storage-s3";
import { mongooseAdapter } from "@payloadcms/db-mongodb";

import sharp from "sharp"; // sharp-import
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Administrators } from "./collections/Administrators";
import { Footer } from "./globals/Footer/config";
import { Header } from "./globals/Header/config";
import { plugins } from "./plugins";
import { defaultLexical } from "@/fields/defaultLexical";
import { getServerSideURL } from "@/utilities/getURL";
import { ProductDetails } from "@/globals/(ecommerce)/ProductDetails/config";
import { en } from "payload/i18n/en";
import { pl } from "payload/i18n/pl";
import { Products } from "./collections/(ecommerce)/Products";
import { ProductReviews } from "./collections/(ecommerce)/ProductReviews";
import { Customers } from "./collections/(ecommerce)/Customers";
import { ProductCategories } from "./collections/(ecommerce)/ProductCategories";
import { ProductSubCategories } from "./collections/(ecommerce)/ProductSubCategories";
import { ProductList } from "./globals/(ecommerce)/ProductList/config";
import { ShopSettings } from "./globals/(ecommerce)/ShopSettings/config";
import { Cart } from "./globals/(ecommerce)/Cart/config";
import { Checkout } from "./globals/(ecommerce)/Checkout/config";
import { InPostPickup } from "./globals/(ecommerce)/Couriers/InPostPickup/config";
import { InPostCourier } from "./globals/(ecommerce)/Couriers/InPostCourier/config";
import { Paywalls } from "./globals/(ecommerce)/Paywalls/config";
// import 'payloadcms-lexical-ext/client/client.css'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Logo: "@/components/AdminLogoBig/AdminLogoBig#AdminLogoBig",
        Icon: "@/components/AdminLogoIcon/AdminLogoIcon#AdminLogoIcon",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Administrators.slug,
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 375,
          height: 667,
        },
        {
          label: "Tablet",
          name: "tablet",
          width: 768,
          height: 1024,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  i18n: {
    supportedLanguages: { en, pl },
    fallbackLanguage: "en",
  },
  localization: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Administrators,
    Customers,
    Products,
    ProductCategories,
    ProductSubCategories,
    ProductReviews,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [
    Header,
    Footer,
    ShopSettings,
    ProductDetails,
    ProductList,
    Cart,
    Checkout,
    InPostPickup,
    InPostCourier,
    Paywalls,
  ],
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        [Media.slug]: true,
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        endpoint: process.env.S3_ENDPOINT || "",
        region: "auto",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        requestChecksumCalculation: "WHEN_REQUIRED",
        responseChecksumValidation: "WHEN_REQUIRED",
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
