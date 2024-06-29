"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import AddToCart from "../forms/add-to-cart";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";

const sendWhatsAppEnq = async (data) => {
  return await http().post(
    `${endpoints.enquiries.getAll}/whatsapp/${data.id}`,
    data,
  );
};

export default function ProductTable({ products }) {
  const { watch, control, getValues, setValue } = useForm({
    defaultValues: { products: [] },
  });
  const { fields } = useFieldArray({ control, name: "products" });

  const whatsAppEnqMutation = useMutation(sendWhatsAppEnq, {
    onSuccess: (data) => {
      toast.success(data?.message ?? "Enquiry sent");
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message ?? "error");
    },
  });

  const handleWhatsAppEnq = (e, id, enqFor) => {
    e.stopPropagation();
    if (!enqFor) return toast.warning("Please select enquiry for.");
    whatsAppEnqMutation.mutate({ id, enqFor });
  };

  useEffect(() => {
    setValue(
      "products",
      products?.map((product) => ({ ...product, _id: product.id })),
    );
  }, [products?.length]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="*:bg-primary/20">
          <TableHead className="rounded-bl-md rounded-tl-md text-primary">
            Product
          </TableHead>
          <TableHead className="rounded-br-md rounded-tr-md text-right text-primary">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr]:mt-2">
        {fields?.map((product, key) => (
          <TableRow
            key={product.id}
            className="text-xs *:bg-white *:py-1 *:font-medium hover:bg-primary/5"
          >
            <TableCell className="rounded-bl-md rounded-tl-md  capitalize">
              <Link
                href={`/products/${product.slug}`}
                className="transition-colors hover:text-primary"
              >
                {product.title}
              </Link>
            </TableCell>
            <TableCell className="flex items-center justify-end gap-4 space-x-2 rounded-br-md rounded-tr-md">
              <div className="flex items-center justify-center sm:justify-start">
                <Controller
                  control={control}
                  name={`products.${key}.item_type`}
                  render={({ field }) => (
                    <RadioGroup
                      defaultValue={field.value}
                      className="flex items-center justify-start"
                      onValueChange={field.onChange}
                    >
                      {["buy", "sell"].map((type) => (
                        <div
                          key={type}
                          className={cn(
                            "flex items-center justify-center space-x-2 rounded-xl border p-2 transition-colors",
                            {
                              "border-primary/50 bg-primary/20":
                                watch("enquiry_type") === type,
                            },
                          )}
                        >
                          <RadioGroupItem value={type} id={type} />
                          <Label
                            htmlFor={type}
                            className="cursor-pointer text-xs capitalize"
                          >
                            {type}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
              <AddToCart
                id={product._id}
                type={watch(`products.${key}.item_type`)}
              />
              <Button
                size="icon"
                className="bg-[#00a884] text-white hover:bg-[#00a884]"
                onClick={(e) =>
                  handleWhatsAppEnq(
                    e,
                    product._id,
                    watch(`products.${key}.item_type`),
                  )
                }
              >
                <FaWhatsapp size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
