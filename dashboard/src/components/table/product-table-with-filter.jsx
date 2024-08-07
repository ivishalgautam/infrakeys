"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ChevronDown } from "lucide-react";
import { Muted, Small } from "../ui/typography";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FaWhatsapp } from "react-icons/fa";
import AddToCart from "../Forms/add-to-cart";

export default function ProductTableWithFilter({ products = [] }) {
  const [customProperties, setCustomProperties] = useState({});
  const { watch, control, getValues, setValue } = useForm({
    defaultValues: { products: [] },
  });
  const { fields } = useFieldArray({ control, name: "products" });
  const [filters, setFilters] = useState({});
  // console.log({ products, customProperties, filters });

  const handleCheckChange = (check, name, value) => {
    setFilters((prev) => {
      const newArray = prev[name.toLowerCase()] || [];

      const updatedArray = check
        ? [...newArray, value]
        : newArray.filter((i) => i !== value.toLowerCase());

      return { ...prev, [name]: updatedArray };
    });
  };

  const getFilteredProducts = useCallback(() => {
    if (Object.keys(filters).every((i) => filters[i].length === 0))
      return products;

    return products?.filter((product) => {
      // Check if any custom property matches
      for (const prop in filters) {
        if (filters[prop].length === 0) continue; // empty filters

        if (
          !product.custom_properties.some(
            (cp) =>
              cp.name.toLowerCase() === prop.toLowerCase() &&
              cp.values.some((value) =>
                filters[prop.toLowerCase()].includes(value.toLowerCase())
              )
          )
        ) {
          return false;
        }
      }

      return true;
    });
  }, [filters, products]);

  useEffect(() => {
    if (!(products?.length === 1 && products?.[0] === null)) {
      setValue(
        "products",
        products?.map((product) => ({ ...product, _id: product.id }))
      );

      for (const { sub_category_name, custom_properties } of products) {
        for (const cp of custom_properties) {
          const name = String(cp.name).toLowerCase();
          if (name) {
            setCustomProperties((prev) => ({
              ...prev,
              [name]: prev[name]
                ? [
                    ...prev[name],
                    ...cp.values
                      .filter(
                        (item) => !prev[name].includes(item.toLowerCase())
                      )
                      .map((item) => item.toLowerCase()),
                  ]
                : [...cp.values.map((item) => item.toLowerCase())],
            }));
          }
        }
      }
    }
  }, [products]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-start gap-4">
        {Object.keys(filters).some((item) => filters[item].length) && (
          <div
            className="inline-block cursor-pointer space-x-1 rounded-full bg-white px-2 py-1 text-xs text-black"
            onClick={() => setFilters({})}
          >
            clear all
          </div>
        )}
        {Object.keys(filters).map((item) =>
          filters[item].length ? (
            <div key={item} className="space-y-1">
              <Muted className={"text-xs capitalize"}>{item}: </Muted>
              <div className="space-x-1">
                {filters[item].map((ele) => (
                  <div
                    key={ele}
                    className={
                      "inline-block cursor-pointer space-x-1 rounded-full border border-primary/50 bg-primary/20 px-2 py-1 text-xs text-primary"
                    }
                  >
                    <span className="uppercase">{ele}</span>
                    <span onClick={() => handleCheckChange(false, item, ele)}>
                      x
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )
        )}
      </div>

      <div className="flex flex-wrap items-center justify-start gap-2">
        {Object.keys(customProperties).map((val) => (
          <DropdownMenu key={val}>
            <DropdownMenuTrigger
              className={`flex items-center justify-center gap-2 rounded-lg border border-primary bg-white px-3 py-2 text-sm capitalize text-primary outline-none`}
            >
              <span>{val.split("_").join(" ")}</span>
              <span>
                <ChevronDown size={20} />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-h-96 overflow-y-auto">
              <DropdownMenuLabel className="capitalize">
                {val.split("_").join(" ")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {customProperties[val].map((item, key) => (
                <DropdownMenuItem key={key} className="space-x-2">
                  <Checkbox
                    id={item}
                    checked={filters?.[val]?.includes(item) ?? false}
                    onCheckedChange={(check) =>
                      handleCheckChange(check, val, item)
                    }
                  />
                  <label
                    htmlFor={item}
                    className="text-xs font-medium uppercase leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item}
                  </label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>

      <div>
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
            {!getFilteredProducts()?.length
              ? "No products found!"
              : getFilteredProducts()?.map((product, key) => (
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
                                    }
                                  )}
                                >
                                  <RadioGroupItem value={type} id={type} />
                                  <Label
                                    htmlFor={type}
                                    className="cursor-pointer capitalize"
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
                        id={product.id}
                        type={watch(`products.${key}.item_type`)}
                      />
                      <Button
                        size="icon"
                        className="bg-[#00a884] text-white hover:bg-[#00a884]"
                      >
                        <FaWhatsapp size={20} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
