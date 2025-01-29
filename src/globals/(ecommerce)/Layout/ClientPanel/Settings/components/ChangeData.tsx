"use client";

import { Input } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";

const ChangeData = ({
  value,
  text,
  altText,
  name,
  userID,
  type = "text",
}: {
  value: string;
  text: string;
  altText: string;
  name: string;
  userID: string;
  type?: string;
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const onSubmit = async (values) => {
    // console.log(values);
    try {
      await axios.patch(
        `/api/customers/${userID}`,
        { [name]: type === "date" ? new Date(values[name]).toISOString() : values[name] },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.error(error);
      form.reset();
    }
  };
  const form = useForm({
    defaultValues: {
      [name]: type === "date" ? value.split("T")[0] : value,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex w-full items-center">
              <FormControl>
                <Input
                  className="w-full border-none p-0 text-gray-900 outline-none ring-0 focus-within:outline-none focus:outline-none"
                  type={type}
                  readOnly={!isEnabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="link"
          type={isEnabled ? "button" : "submit"}
          onClick={() => setIsEnabled(!isEnabled)}
          className="items-center py-2 font-semibold text-indigo-600 hover:text-indigo-500"
        >
          {isEnabled ? altText : text}
        </Button>
      </form>
    </Form>
  );
};
export default ChangeData;
