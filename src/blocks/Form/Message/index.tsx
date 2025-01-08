import RichText from "@/components/RichText";

import { Width } from "../Width";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export const Message = ({ message }: { message: SerializedEditorState }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichText data={message} />}
    </Width>
  );
};
