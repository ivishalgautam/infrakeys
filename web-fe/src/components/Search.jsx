import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { searchProducts } from "@/hooks/useSearchProducts";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import AddToCart from "./forms/add-to-cart";
import { GeistMono } from "geist/font/mono";

export default function SearchBox() {
  const [searchResults, setSearchResults] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const throttleTimeoutRef = useRef(null);
  const pathname = usePathname();
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const containerRef = useRef(null);

  const handleSearch = async (value) => {
    if (!value.trim()) return setSearchResults([]);
    const searchQuery = value.replace(/\s+/g, "-");
    const results = await searchProducts(searchQuery);
    setSearchResults(results);
    setIsResultsVisible(true);
  };

  useEffect(() => {
    const throttledInputChange = (value) => {
      if (throttleTimeoutRef.current !== null) {
        clearTimeout(throttleTimeoutRef.current);
      }
      throttleTimeoutRef.current = setTimeout(() => {
        throttleTimeoutRef.current = null;
        handleSearch(value);
      }, 300);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsResultsVisible(false);
      } else {
        setIsResultsVisible(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  // console.log(isResultsVisible, searchResults);

  return (
    <div className="h-full w-full" ref={containerRef}>
      <div
        className={cn("relative", {
          "rounded-lg bg-white": searchResults?.length && isResultsVisible,
        })}
      >
        <form>
          <div
            className={cn(
              "flex w-full items-center justify-between rounded-md bg-white p-3 shadow-md",
              {
                "rounded-bl-none rounded-br-none":
                  searchResults?.length && isResultsVisible,
              },
            )}
          >
            <Search className="ml-2 text-xl text-primary" size={30} />
            <Input
              placeholder="Search..."
              className={`border-none bg-transparent ${GeistMono.className} font-semibold`}
              onChange={(e) => setInputVal(e.target.value)}
              value={inputVal}
            />
            <Button type="button" className={"rounded-md"} variant="primary">
              Search
            </Button>
          </div>
        </form>
        {inputVal && isResultsVisible && searchResults?.length > 0 && (
          <div className="absolute left-0 top-full z-10 max-h-48 w-full overflow-y-scroll rounded-bl-lg rounded-br-lg shadow-md">
            <ProductTable products={searchResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductTable({ products }) {
  const { watch, control, getValues, setValue } = useForm({
    defaultValues: { products: [] },
  });
  const router = useRouter();
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
            className="group cursor-pointer text-xs *:bg-white *:py-1 *:font-medium hover:bg-primary/5"
            onClick={() => router.push(`/products/${product.slug}`)}
          >
            <TableCell className="capitalize">
              <span className="group-hover:text-primary">{product.title}</span>
            </TableCell>
            <TableCell className="flex items-center justify-end gap-4 space-x-2">
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
                        <Label
                          htmlFor={`products.${key}.${type}`}
                          key={type}
                          className={cn(
                            "flex cursor-pointer items-center justify-center gap-1 space-x-2 rounded-xl border p-2 text-xs capitalize transition-colors",
                            {
                              "border-primary/50 bg-primary/20":
                                watch(`products.${key}.item_type`) === type,
                            },
                          )}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <RadioGroupItem
                            value={type}
                            id={`products.${key}.${type}`}
                          />
                          {type}
                        </Label>
                      ))}
                    </RadioGroup>
                  )}
                />
              </div>
              <AddToCart
                id={product._id}
                type={watch(`products.${key}.item_type`)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
