"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Customer } from "@/payload-types";
import { CheckoutFormData } from "@/schemas/checkoutForm.schema";
import { cn } from "@/utilities/cn";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

export const AddNewAddressDialog = ({
  open,
  setOpen,
  //   shippingAddresses,
  //   selectedID,
  //   setShipping,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  //   shippingAddresses: NonNullable<Customer["shippings"]>;
  //   selectedID?: string;
  //   setShipping: (shipping: CheckoutFormData["shipping"]) => void;
}) => {
  const form = useForm();
  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle className="mb-4">Change address</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 md:grid-cols-2">TEST</div>
        <DialogFooter>
          <DialogClose className="w-full">
            <Button variant="tailwind">Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
