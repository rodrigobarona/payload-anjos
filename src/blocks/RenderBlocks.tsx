import type { Page } from "@/payload-types";

import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
// import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { CarouselBlock } from "./Carousel/Component";

const blockComponents = {
  content: ContentBlock,
  cta: CallToActionBlock,
  //   formBlock: FormBlock,
  carousel: CarouselBlock,
  mediaBlock: MediaBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            // @ts-ignore
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="mx-auto" key={index}>
                  {/* @ts-ignore */}
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
