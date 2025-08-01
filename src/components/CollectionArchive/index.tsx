import React from "react";

import { Card, type CardPostData } from "@/components/Card";
import { cn } from "src/utilities/cn";

export type Props = {
  posts: CardPostData[];
};

export const CollectionArchive = (props: Props) => {
  const { posts } = props;

  return (
    <div className={cn("container")}>
      <div>
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 sm:grid-cols-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === "object" && result !== null) {
              return (
                <div className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};
