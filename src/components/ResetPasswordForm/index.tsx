"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ResetPasswordFormData, useResetPasswordForm } from "@/schemas/ResetPasswordFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "@/i18n/routing";

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
    <Form {...form}>
      <form className="twp container grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
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
  );
};
