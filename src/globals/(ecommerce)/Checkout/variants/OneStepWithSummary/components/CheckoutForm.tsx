"use client";

import { ReactNode, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckoutFormData, useCheckoutFormSchema } from "@/schemas/checkoutForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Customer } from "@/payload-types";

const deliveryMethods = [
  { id: 1, title: "Standard", turnaround: "4–10 business days", price: "$5.00" },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];
const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

export const CheckoutForm = ({ user, children }: { user?: Customer; children: ReactNode }) => {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0]);
  const { CheckoutFormSchemaResolver } = useCheckoutFormSchema();

  const defaultShippingAddress = user?.shippings?.find((shippingAddress) => shippingAddress.default);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutFormSchemaResolver),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      buyerType: user?.lastBuyerType ?? "individual",
      individualInvoice: false,
      invoice: {
        name: "",
        address: "",
        city: "",
        postalCode: "",
        tin: "",
      },
      shipping: {
        address: defaultShippingAddress?.address ?? "",
        city: defaultShippingAddress?.city ?? "",
        country: defaultShippingAddress?.country ?? "",
        region: defaultShippingAddress?.region ?? "",
        postalCode: defaultShippingAddress?.postalCode ?? "",
        phone: defaultShippingAddress?.phone ?? "",
        email: defaultShippingAddress?.email ?? "",
      },
      deliveryMethod: "",
      paymentMethod: "",
    },
  });

  const onSubmit = async (values: CheckoutFormData) => {
    try {
      console.log(values);
    } catch (error) {}
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {defaultShippingAddress ? (
                <p>Block with selected address and ability to change it</p>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="shipping.address"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipping.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipping.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full appearance-none rounded-md bg-white py-2 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 focus:ring-0 focus:ring-offset-0 sm:text-sm/6">
                                <SelectValue placeholder="Select a verified email to display" />
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
                    name="shipping.region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State / Province</FormLabel>
                        <FormControl>
                          <Input placeholder="State / Province" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipping.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shipping.phone"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="shipping.email"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
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
              <legend className="text-lg font-medium text-gray-900">Delivery method</legend>

              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
                className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
              >
                {deliveryMethods.map((deliveryMethod) => (
                  <Radio
                    key={deliveryMethod.id}
                    value={deliveryMethod}
                    aria-label={deliveryMethod.title}
                    aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
                    className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                  >
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <span className="block text-sm font-medium text-gray-900">
                          {deliveryMethod.title}
                        </span>
                        <span className="mt-1 flex items-center text-sm text-gray-500">
                          {deliveryMethod.turnaround}
                        </span>
                        <span className="mt-6 text-sm font-medium text-gray-900">{deliveryMethod.price}</span>
                      </span>
                    </span>
                    <CheckCircleIcon
                      aria-hidden="true"
                      className="size-5 text-indigo-600 group-[&:not([data-checked])]:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                    />
                  </Radio>
                ))}
              </RadioGroup>
            </fieldset>
          </div>

          {/* Payment */}
          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Payment</h2>

            <fieldset className="mt-4">
              <legend className="sr-only">Payment type</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                  <div key={paymentMethod.id} className="flex items-center">
                    <input
                      defaultChecked={paymentMethodIdx === 0}
                      id={paymentMethod.id}
                      name="payment-type"
                      type="radio"
                      className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                    />
                    <label
                      htmlFor={paymentMethod.id}
                      className="ml-3 block text-sm/6 font-medium text-gray-700"
                    >
                      {paymentMethod.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
              <div className="col-span-4">
                <label htmlFor="card-number" className="block text-sm/6 font-medium text-gray-700">
                  Card number
                </label>
                <div className="mt-2">
                  <input
                    id="card-number"
                    name="card-number"
                    type="text"
                    autoComplete="cc-number"
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-4">
                <label htmlFor="name-on-card" className="block text-sm/6 font-medium text-gray-700">
                  Name on card
                </label>
                <div className="mt-2">
                  <input
                    id="name-on-card"
                    name="name-on-card"
                    type="text"
                    autoComplete="cc-name"
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-3">
                <label htmlFor="expiration-date" className="block text-sm/6 font-medium text-gray-700">
                  Expiration date (MM/YY)
                </label>
                <div className="mt-2">
                  <input
                    id="expiration-date"
                    name="expiration-date"
                    type="text"
                    autoComplete="cc-exp"
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cvc" className="block text-sm/6 font-medium text-gray-700">
                  CVC
                </label>
                <div className="mt-2">
                  <input
                    id="cvc"
                    name="cvc"
                    type="text"
                    autoComplete="csc"
                    className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </form>
    </Form>
  );
};
