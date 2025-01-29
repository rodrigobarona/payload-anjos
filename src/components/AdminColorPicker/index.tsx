"use client";

import { FieldLabel, useField } from "@payloadcms/ui";
import { type TextFieldClientComponent } from "payload";

import { GradientPicker } from "../ui/backgroundPicker";

export const AdminColorPicker: TextFieldClientComponent = ({ path, field }) => {
  const { value, setValue } = useField<{ value: string | undefined }>({ path });

  // TODO: fetch media images or sth
  // useEffect(() => {
  //   const fetchImages = async () => {};
  // });

  return (
    <>
      <FieldLabel label={field.label}></FieldLabel>
      <div
        className="preview twp flex h-full min-h-[150px] w-full items-center justify-center rounded !bg-cover !bg-center p-10 transition-all"
        style={{ background: typeof value === "string" ? value : "transparent" }}
      >
        <GradientPicker background={typeof value === "string" ? value : ""} setBackground={setValue} />
      </div>
    </>
  );
};
