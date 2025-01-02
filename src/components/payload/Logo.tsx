import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    <Image
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("h-[34px] w-full max-w-[9.375rem]", className)}
      src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
    />
  );
};
