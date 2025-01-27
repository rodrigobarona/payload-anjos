"use client";

import { useCallback, useEffect, useState } from "react";
import { Button, Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useForm, useWatch } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckoutFormData, useCheckoutFormSchema } from "@/schemas/checkoutForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer, Media } from "@/payload-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocale, useTranslations } from "next-intl";
import { DeliveryMethod } from "./DeliveryMethod";
import debounce from "lodash.debounce";
import axios from "axios";
import { Cart } from "@/stores/CartStore/types";
import { useCart } from "@/stores/CartStore";
import { Currency } from "@/stores/Currency/types";
import { ProductWithFilledVariants } from "@/globals/(ecommerce)/Layout/Cart/variants/SlideOver";
import { OrderSummary } from "./OrderSummary";
import { Locale } from "@/i18n/config";
import { useCurrency } from "@/stores/Currency";
import { useRouter } from "@/i18n/routing";
import { ShippingAddressForm } from "@/components/(ecommerce)/ShippingAddressForm";
import { ChangeAddressDialog } from "./ChangeAddressDialog";
import { AddNewAddressDialog } from "./AddNewAddressDialog";

export type FilledCourier = {
  slug: string;
  title: string;
  turnaround: string;
  icon?: Media;
  pricing:
    | {
        value: number;
        currency: Currency;
        id?: string | null;
      }[]
    | undefined;
};

export const CheckoutForm = ({ user, geowidgetToken }: { user?: Customer; geowidgetToken?: string }) => {
  const { CheckoutFormSchemaResolver } = useCheckoutFormSchema();
  const t = useTranslations("CheckoutForm.form");

  const defaultShippingAddress = user?.shippings?.find((shippingAddress) => shippingAddress.default);
  const shippingAddresses = user?.shippings && user.shippings.length > 0 && user.shippings;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchemaResolver),
    defaultValues: {
      buyerType: user?.lastBuyerType ?? "individual",
      individualInvoice: false,
      invoice: {
        name: "",
        address: "",
        city: "",
        country: "",
        region: "",
        postalCode: "",
        tin: "",
      },
      shipping: {
        id: defaultShippingAddress?.id ?? "",
        name: defaultShippingAddress?.name ?? "",
        address: defaultShippingAddress?.address ?? "",
        city: defaultShippingAddress?.city ?? "",
        country: defaultShippingAddress?.country ?? "pl",
        region: defaultShippingAddress?.region ?? "",
        postalCode: defaultShippingAddress?.postalCode ?? "",
        phone: defaultShippingAddress?.phone ?? "",
        email: defaultShippingAddress?.email ?? "",
        pickupPointID: "",
        pickupPointAddress: "",
      },
      deliveryMethod: "",
    },
  });
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [addShippingDialogOpen, setAddShippingDialogOpen] = useState(false);

  const wantsInvoice = useWatch({ control: form.control, name: "individualInvoice" });
  const isCompany = useWatch({ control: form.control, name: "buyerType" }) === "company";
  const selectedDelivery = useWatch({ control: form.control, name: "deliveryMethod" });
  const shipping = useWatch({ control: form.control, name: "shipping" });

  const [checkoutProducts, setCheckoutProducts] = useState<ProductWithFilledVariants[]>();
  const [totalPrice, setTotalPrice] = useState<
    {
      currency: Currency;
      value: number;
    }[]
  >();
  const [deliveryMethods, setDeliveryMethods] = useState<FilledCourier[]>([]);

  const { cart, setCart } = useCart();
  const locale = useLocale() as Locale;
  const currency = useCurrency();

  /**
   * Fetches products from the cart, calculates the total price and available couriers with their prices. Basically, it's getting all checkout needed data.
   * @param cartToCalculate - Actual cart to calculate the total price and available couriers.
   * @param countryToCalculate - Country to get available couriers.
   * @returns void
   */
  const fetchCartProducts = useCallback(
    debounce(async (cartToCalculate: Cart | null, countryToCalculate: string) => {
      try {
        const { data } = await axios.post<{
          status: number;
          productsWithTotalAndCouriers: {
            filledProducts: ProductWithFilledVariants[];
            total: {
              currency: Currency;
              value: number;
            }[];
            totalQuantity: number;
            couriers: FilledCourier[];
          };
        }>("/next/checkout", { cart: cartToCalculate, selectedCountry: countryToCalculate, locale });
        const { filledProducts, total, couriers } = data.productsWithTotalAndCouriers;
        setCheckoutProducts(filledProducts);
        setDeliveryMethods(couriers);
        setTotalPrice(total);
      } catch (error) {
        console.error(error);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    fetchCartProducts(cart, shipping.country);
  }, [cart, shipping.country]);

  const router = useRouter();

  const onSubmit = async (values: CheckoutFormData) => {
    try {
      const { data } = await axios.post<{ status: number; url?: string }>("/next/payment", {
        cart,
        selectedCountry: shipping.country,
        checkoutData: values,
        locale,
        currency: currency.currency,
      });
      if (data.status === 200 && data.url) {
        setCart(null);
        router.push(data.url);
      } else {
        form.setError("root", { message: t("internal-server-error") });
      }
    } catch (error) {
      form.setError("root", { message: t("internal-server-error") });
      console.log(error);
    }
  };

  return (
    <>
      <AddNewAddressDialog open={addShippingDialogOpen} setOpen={setAddShippingDialogOpen} />
      {shippingAddresses && (
        <ChangeAddressDialog
          open={shippingDialogOpen}
          setOpen={setShippingDialogOpen}
          setAddShippingDialogOpen={setAddShippingDialogOpen}
          shippingAddresses={shippingAddresses}
          selectedID={shipping.id}
          setShipping={(shipping) => {
            form.setValue("shipping", shipping);
          }}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">{t("buy-as")}</h2>
              <FormField
                control={form.control}
                name="buyerType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Tabs defaultValue="individual" onValueChange={field.onChange} className="my-4">
                        <TabsList className="w-full">
                          <TabsTrigger className="w-1/2" value="individual">
                            {t("individual")}
                          </TabsTrigger>
                          <TabsTrigger className="w-1/2" value="company">
                            {t("company")}
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h2 className="text-lg font-medium text-gray-900">{t("shipping-address")}</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {shippingAddresses ? (
                  <div className="group relative flex cursor-pointer rounded-lg border border-gray-300 border-transparent bg-white p-4 shadow-sm ring-2 ring-main-500 focus:outline-none">
                    <span className="flex flex-1">
                      <span className="flex w-full flex-col">
                        <span className="block text-sm font-medium text-gray-900">{shipping.name}</span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">
                          {shipping.address}
                        </span>
                        <span className="mt-1 text-sm font-medium text-gray-500">
                          {shipping.postalCode}, {shipping.city}, {shipping.country}
                        </span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.phone}</span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">{shipping.email}</span>
                        <Button
                          type="button"
                          onClick={() => setShippingDialogOpen(true)}
                          className="ml-auto mt-1 text-sm text-main-600"
                        >
                          {t("change")}
                        </Button>
                      </span>
                    </span>
                  </div>
                ) : (
                  <ShippingAddressForm />
                )}
                {!isCompany && (
                  <FormField
                    control={form.control}
                    name="individualInvoice"
                    render={({ field }) => (
                      <FormItem className="rounded-mdp-4 flex flex-row items-start space-x-3 space-y-0 sm:col-span-2">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>{t("other-invoice")}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                )}
                {(wantsInvoice || isCompany) && (
                  <>
                    <h2 className="text-lg font-medium text-gray-900 sm:col-span-2">{t("invoice-data")}</h2>
                    <FormField
                      control={form.control}
                      name="invoice.name"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t("full-name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("full-name-placeholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {isCompany && (
                      <FormField
                        control={form.control}
                        name="invoice.tin"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>{t("tin")}</FormLabel>
                            <FormControl>
                              <Input placeholder={t("tin-placeholder")} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name="invoice.address"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t("address")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("address-placeholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="invoice.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("city")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("city-placeholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="invoice.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("country")}</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full appearance-none rounded-md bg-white py-2 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-main-600 focus:ring-0 focus:ring-offset-0 sm:text-sm/6">
                                  <SelectValue placeholder={t("country-placeholder")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pl">Poland</SelectItem>
                                <SelectItem value="uk">United Kingdom</SelectItem>
                                <SelectItem value="us">USA</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="invoice.region"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("region")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("region-placeholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="invoice.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("postal-code")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("postal-code-placeholder")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <fieldset>
                <legend className="text-lg font-medium text-gray-900">{t("delivery-method")}</legend>
                <FormField
                  control={form.control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onChange={field.onChange}
                      className="mt-4 grid grid-cols-1 gap-y-3 sm:gap-x-4"
                    >
                      {deliveryMethods.map((deliveryMethod) => (
                        <Radio
                          key={deliveryMethod.slug}
                          value={deliveryMethod.slug}
                          aria-label={deliveryMethod.title}
                          aria-description={`${deliveryMethod.turnaround} for price`}
                          className="group relative flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-main-500"
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-main-500"
                          />

                          <DeliveryMethod geowidgetToken={geowidgetToken} deliveryMethod={deliveryMethod} />
                        </Radio>
                      ))}
                      {deliveryMethods.length === 0 && <p>{t("no-shipping")}</p>}
                      <FormMessage />
                    </RadioGroup>
                  )}
                />
              </fieldset>
            </div>
          </div>
          <OrderSummary
            products={checkoutProducts}
            totalPrice={totalPrice}
            shippingCost={deliveryMethods.find((method) => method.slug === selectedDelivery)?.pricing}
            errorMessage={form.formState.errors.root?.message}
          />
        </form>
      </Form>
    </>
  );
};
