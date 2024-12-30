import { Plugin } from "payload";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { GenerateTitle, GenerateURL } from "@payloadcms/plugin-seo/types";
import { Page } from "@/payload-types";
import { getServerSideURL } from "@/utils/payload/getURL";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : "Payload Website Template";
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL();

  return doc?.slug ? `${url}/${doc.slug}` : url;
};

export const plugins: Plugin[] = [
  payloadCloudPlugin(),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  redirectsPlugin({
    collections: ["pages"],
  }),
];
