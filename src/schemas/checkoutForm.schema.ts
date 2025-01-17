import { z, ZodType } from "zod";
import { useTranslations } from "next-intl";

export const CheckoutFormSchemaServer = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  buyerType: z.string().nonempty(),
  individualInvoice: z.boolean(),
  invoice: z
    .object({
      name: z.string().nonempty(),
      address: z.string().nonempty(),
      city: z.string().nonempty(),
      postalCode: z.string().nonempty(),
      tin: z.string().optional(),
    })
    .optional(),
  shipping: z.object({
    address: z.string().nonempty(),
    city: z.string().nonempty(),
    country: z.string().nonempty(),
    region: z.string().nonempty(),
    postalCode: z.string().nonempty(),
    phone: z.string().nonempty(),
    email: z.string().nonempty().email(),
  }),
  deliveryMethod: z.string().nonempty(),
  paymentMethod: z.string().nonempty(),
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchemaServer>;

export const useCheckoutFormSchema = () => {
  //   const t = useTranslations("CheckoutForm.errors");

  const CheckoutFormSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    buyerType: z.string().nonempty(),
    individualInvoice: z.boolean(),
    invoice: z
      .object({
        name: z.string().nonempty(),
        address: z.string().nonempty(),
        city: z.string().nonempty(),
        postalCode: z.string().nonempty(),
        tin: z.string().optional(),
      })
      .optional(),
    shipping: z.object({
      address: z.string().nonempty(),
      city: z.string().nonempty(),
      country: z.string().nonempty(),
      region: z.string().nonempty(),
      postalCode: z.string().nonempty(),
      phone: z.string().nonempty(),
      email: z.string().nonempty().email(),
    }),
    deliveryMethod: z.string().nonempty(),
    paymentMethod: z.string().nonempty(),
  });

  const CheckoutFormSchemaResolver: ZodType<CheckoutFormData> = CheckoutFormSchema;

  return { CheckoutFormSchema, CheckoutFormSchemaResolver };
};
