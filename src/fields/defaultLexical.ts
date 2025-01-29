import { LinkFeature, lexicalEditor, BlocksFeature } from "@payloadcms/richtext-lexical";
import { type Config } from "payload";

// import {
//   BgColorFeature,
//   HighlightColorFeature,
//   TextColorFeature,
//   YoutubeFeature,
//   VimeoFeature,
// } from "payloadcms-lexical-ext";
import { Accordion } from "@/blocks/Accordion/config";
import { Carousel } from "@/blocks/Carousel/config";
import { FormBlock } from "@/blocks/Form/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";

export const defaultLexical: Config["editor"] = lexicalEditor({
  features: ({ defaultFeatures }) => {
    return [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [Carousel, FormBlock, Accordion],
      }),
      LinkFeature({
        enabledCollections: ["pages", "posts"],
        fields: ({ defaultFields }) => {
          const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
            if ("name" in field && field.name === "url") return false;
            return true;
          });

          return [
            ...defaultFieldsWithoutUrl,
            {
              name: "url",
              type: "text",
              admin: {
                condition: ({ linkType }) => linkType !== "internal",
              },
              label: ({ t }) => t("fields:enterURL"),
              required: true,
            },
          ];
        },
      }),
      // TextColorFeature(),
      // HighlightColorFeature(),
      // BgColorFeature(),

      //   YoutubeFeature(),
      //   VimeoFeature(),
    ];
  },
});
