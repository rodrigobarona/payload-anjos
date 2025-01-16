"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, useLoginFormSchema } from "@/schemas/loginForm.schema";
import { useForm } from "react-hook-form";
import { Link, useRouter } from "@/i18n/routing";
import axios, { isAxiosError } from "axios";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const { LoginFormSchemaResolver } = useLoginFormSchema();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchemaResolver),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const t = useTranslations("LoginForm");
  const router = useRouter();

  const onSubmit = async (values: LoginFormData) => {
    try {
      const res = await axios.post("/api/customers/login", values);
      console.log(res.status);
      if (res.status === 200 || res.status === 201) {
        router.replace("/account");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          form.setError("root", { message: t("errors.auth") });
        } else {
          form.setError("root", { message: t("errors.server-error") });
        }
      } else {
        console.log(error);
        form.setError("root", { message: t("errors.server-error") });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 ring-offset-0 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password")}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 ring-offset-0 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="••••••••••••"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.message ? (
          <p className="text-sm text-red-500">{form.formState.errors.root?.message}</p>
        ) : (
          ""
        )}
        <div className="ml-auto text-sm/6">
          <Link href="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
            {t("forgot-password")}
          </Link>
        </div>
        <Button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};
export default LoginForm;
