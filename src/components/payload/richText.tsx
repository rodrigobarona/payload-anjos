import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { DefaultNodeTypes, SerializedBlockNode } from "@payloadcms/richtext-lexical";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { JSXConvertersFunction, RichText as RichTextWithoutBlocks } from "@payloadcms/richtext-lexical/react";

import { CodeBlock, CodeBlockProps } from "@/blocks/Code/Component";

import type { CallToActionBlock as CTABlockProps, MediaBlock as MediaBlockProps } from "@/payload-types";
// import { BannerBlock } from "@/blocks/Banner/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { cn } from "@/utils/cn";
import { TextJSXConverter } from "./lexical-ext/text";
import { ParagraphJSXConverter } from "./lexical-ext/paragraph";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CTABlockProps | MediaBlockProps | CodeBlockProps>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    // banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
  // ...JSXConverters,
  ...TextJSXConverter,
  ...ParagraphJSXConverter,
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <RichTextWithoutBlocks
      //@ts-ignore
      converters={jsxConverters}
      className={cn(
        {
          // container: enableGutter,
          "max-w-none": !enableGutter,
          "md:prose-md prose mx-auto dark:prose-invert": enableProse,
        },
        className,
      )}
      {...rest}
    />
  );
}
