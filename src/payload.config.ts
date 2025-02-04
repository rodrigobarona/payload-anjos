import path from "path";
import { fileURLToPath } from "url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import { en } from "payload/i18n/en";
import { pl } from "payload/i18n/pl";
import sharp from "sharp"; // sharp-import

import { defaultLexical } from "@/fields/defaultLexical";

import { customTranslationsObject } from "./admin/translations/custom-translations";
import { Administrators } from "./collections/Administrators";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { EmailMessages } from "./globals/EmailMessages/config";
import { Footer } from "./globals/Footer/config";
import { Header } from "./globals/Header/config";
import { plugins } from "./plugins";
import { getServerSideURL } from "./utilities/getURL";

// import 'payloadcms-lexical-ext/client/client.css'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    avatar: {
      Component: "@/components/AdminAvatar#AdminAvatar",
    },
    components: {
      afterLogin: ["@/components/AdminResetPassword#AdminResetPassword"],
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
    translations: customTranslationsObject,
  },
  localization: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? "",
  }),
  collections: [Pages, Posts, Media, Categories, Administrators],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, EmailMessages],
  plugins: [
    ...plugins,
    s3Storage({
      collections: {
        [Media.slug]: true,
      },
      bucket: process.env.S3_BUCKET ?? "",
      config: {
        endpoint: process.env.S3_ENDPOINT ?? "",
        region: "auto",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
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
