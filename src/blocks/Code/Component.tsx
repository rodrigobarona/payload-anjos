import { Code } from "./Component.client";

export type CodeBlockProps = {
  code: string;
  language?: string;
  blockType: "code";
};

type Props = CodeBlockProps & {
  className?: string;
};

export const CodeBlock = ({ className, code, language }: Props) => {
  return (
    <div className={[className, "not-prose container max-w-screen-lg"].filter(Boolean).join(" ")}>
      <Code code={code} language={language} />
    </div>
  );
};
