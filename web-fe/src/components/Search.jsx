import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "./ui/input";
import { searchProducts } from "@/hooks/useSearchProducts";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MainContext } from "@/store/context";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { H6 } from "./ui/typography";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import AddToCart from "./forms/add-to-cart";
import { FaWhatsapp } from "react-icons/fa";

const addToCart = (data) => {
  return http().post(`${endpoints.cart.getAll}/temp-cart`, data);
};

export default function SearchBox() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const throttleTimeoutRef = useRef(null);
  const pathname = usePathname();

  const { user } = useContext(MainContext);
  const queryClient = useQueryClient();
  const createMutation = useMutation(addToCart, {
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries("cart");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log({ error });
    },
  });

  const handleAddTocart = async (id) => {
    if (!user) return toast.warning("Please login first");
    if (!user.is_verified) return toast.warning("You are not verified!");
    createMutation.mutate({ product_id: id });
  };

  const handleSearch = async (value) => {
    if (!value.trim()) return setSearchResults([]);
    const searchQuery = value.replace(/\s+/g, "-");
    const results = await searchProducts(searchQuery);
    setSearchResults(results);
  };

  useEffect(() => {
    const throttledInputChange = (value) => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
        handleSearch(value);
      }, 1000);
    };

    throttledInputChange(inputVal);

    return () => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [inputVal]);

  useEffect(() => {
    return () => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
      setSearchResults([]);
      setInputVal("");
    };
  }, [pathname]);

  return (
    <div className="h-full w-full">
      <div className="relative">
        <form>
          <div className="flex w-full items-center justify-between rounded-md bg-white p-2 md:w-4/5">
            <Search className="ml-2 text-xl text-primary" size={30} />
            <Input
              placeholder="Search..."
              className="border-none bg-transparent"
              onChange={(e) => setInputVal(e.target.value)}
              value={inputVal}
            />
            <Button className={"rounded-md"} variant="primary">
              Search
            </Button>
          </div>
        </form>
      </div>
      {inputVal && searchResults?.length > 0 && (
        <div className="md-w-4/5 mt-2 w-full">
          <ProductTable products={searchResults} />
        </div>
      )}
    </div>
  );
}

export function ProductTable({ products }) {
  const { watch, control, getValues, setValue } = useForm({
    defaultValues: { products: [] },
  });
  const { fields } = useFieldArray({ control, name: "products" });

  useEffect(() => {
    setValue(
      "products",
      products?.map((product) => ({ ...product, _id: product.id })),
    );
  }, [products?.length]);

  return (
    <Table className="w-full">
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
                id={product._id}
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
  );
}
