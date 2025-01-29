"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/routing";
import { type ResetPasswordFormData, useResetPasswordForm } from "@/schemas/ResetPasswordFormSchema";


export const ResetPasswordForm = ({ token, collection }: { token: string; collection: string }) => {
  const { ResetPasswordFormResolver } = useResetPasswordForm();
  const form = useForm({
    resolver: zodResolver(ResetPasswordFormResolver),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values: ResetPasswordFormData) => {
    try {
      const { data, status } = await axios.post(`/api/${collection}/reset-password`, {
        token: token,
        password: values.newPassword,
      });

      console.log(data, status);

      if (status === 200) {
        console.log(data, status);
        router.push("/admin/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        throw new Error(error.response?.data?.message || "Failed to reset password");
      }
      console.error("Error:", error);
      throw new Error("Something went wrong");
    }
  };

  const t = useTranslations("ResetPasswordForm");

  return (
    <main className="twp container my-auto flex h-full flex-col items-center">
      <Form {...form}>
        <form
          className="grid w-full max-w-prose gap-4 rounded-lg bg-card p-8 shadow-lg"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-xl font-semibold">{t("title")}</h1>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("new-password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm-password")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant="tailwind" type="submit" className="mt-4">
            {t("change-password")}
          </Button>
        </form>
      </Form>
    </main>
  );
};
