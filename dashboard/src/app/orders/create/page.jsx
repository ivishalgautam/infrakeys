"use client";
import Title from "@/components/Title";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import ProductTableWithFilter from "@/components/table/product-table-with-filter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const fetchProducts = async (searchQuery) => {
  const { data } = await http().get(
    searchQuery
      ? `${endpoints.products.getAll}/dashboard/getAll?q=${searchQuery}`
      : `${endpoints.products.getAll}/dashboard/getAll`
  );
  return data;
};

export default function Create() {
  const [inputVal, setInputVal] = useState("");
  const debouncedSearchTerm = useDebounce(inputVal, 300);
  const { data: products, isFetching } = useQuery({
    queryKey: ["create-order-products", debouncedSearchTerm],
    queryFn: () => fetchProducts(debouncedSearchTerm),
  });

  // const createQueryString = useCallback(
  //   (name, value) => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set(name, value);

  //     return params.toString();
  //   },
  //   [searchParams]
  // );

  const handleChange = (value) => {
    setInputVal(value);
  };

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     // searchParams.set("q", debouncedSearchTerm);
  //     // router.replace(
  //     //   `${pathname}?${createQueryString("q", debouncedSearchTerm)}`
  //     // );
  //   }
  // }, [debouncedSearchTerm]);

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input space-y-4">
      <div className="p-2 flex items-center justify-between">
        <Title text={"Products"} />
        <div
          className={cn(
            "relative flex items-center border rounded justify-between"
          )}
        >
          <Search className="ml-2 text-xl text-primary" size={30} />
          <Input
            placeholder="Search Products"
            className={`border-none bg-transparent `}
            onChange={(e) => handleChange(e.target.value)}
            value={inputVal}
          />
        </div>
      </div>

      <div>
        {isFetching ? (
          <Spinner />
        ) : (
          <ProductTableWithFilter products={products} />
        )}
      </div>
    </div>
  );
}
