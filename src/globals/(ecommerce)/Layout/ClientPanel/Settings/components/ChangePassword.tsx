"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import {
  ChangePasswordModalFormData,
  useChangePasswordModalForm,
} from "@/schemas/changePasswordModalForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Customer } from "@/payload-types";

export const ChangePassword = ({ user }: { user: Customer }) => {
  const t = useTranslations("Account.settings");
  const [message, setMessage] = useState("");

  const { ChangePasswordModalFormResolver } = useChangePasswordModalForm();
  const form = useForm<ChangePasswordModalFormData>({
    resolver: zodResolver(ChangePasswordModalFormResolver),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ChangePasswordModalFormData) => {
    try {
      setMessage("");
      const { status } = await axios.post("/api/customers/login", {
        email: user.email,
        password: values.oldPassword,
      });

      if (status === 200) {
        await axios.patch(
          `/api/customers/${user.id}`,
          {
            password: values.newPassword,
          },
          {
            withCredentials: true,
          },
        );
        setMessage(t("password-form.success"));
        form.reset();
      } else {
        form.setError("oldPassword", { message: t("password-form.errors.password-incorrect") });
      }
    } catch (error) {
      error.status === 401
        ? form.setError("oldPassword", { message: t("password-form.errors.password-incorrect") })
        : form.setError("oldPassword", { message: t("password-form.errors.server-error") });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            type="button"
            className="items-center py-2 font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {t("change-password")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-screen-sm">
          <DialogHeader>
            <DialogTitle className="mb-4">{t("change-password")}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("old-password")}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
          {message && <p className="text-sm font-medium text-green-600">{message}</p>}
        </DialogContent>
      </Dialog>
    </>
  );
};
