import React, { useContext, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { searchProducts } from "@/hooks/useSearchProducts";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Search, Upload } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import AddToCart from "./forms/add-to-cart";
import { GeistMono } from "geist/font/mono";
import { FaWhatsapp } from "react-icons/fa";
import http from "@/utils/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { endpoints } from "@/utils/endpoints";
import Modal from "./Modal";
import RequirementForm from "./forms/requirement";
import { MainContext } from "@/store/context";
import { handleWhatsAppEnq } from "@/lib/handle-whatsapp-enq";

async function createDocs(data) {
  return http().post(endpoints.requirements.getAll, data);
}

export default function SearchBox() {
  const [filePath, setFilePath] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const throttleTimeoutRef = useRef(null);
  const pathname = usePathname();
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const containerRef = useRef(null);
  const { user } = useContext(MainContext);
  const router = useRouter();

  const uploadDocsMutation = useMutation(createDocs, {
    onSuccess: (data) => {
      toast.success(data.message ?? "Documents uploaded.");
      setFilePath([]);
      setIsModal(false);
    },
    onError: (error) => {
      toast.error(error.message ?? "Error uploading documents!");
      setIsModal(false);
    },
  });

  const handleCreate = (data) => {
    uploadDocsMutation.mutate(data);
  };

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
    <>
      <div className="h-full w-full" ref={containerRef}>
        <div
          className={cn("relative", {
            "rounded-lg bg-white": searchResults?.length && isResultsVisible,
          })}
        >
          <form>
            <div
              className={cn(
                "relative flex w-full items-center justify-between rounded-md bg-white p-3 shadow-md",
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

              <Button
                type="button"
                className="absolute left-full top-0 ml-2 hidden flex-col items-center justify-center p-8 shadow-md hover:bg-primary lg:flex"
                size="icon"
                variant="primary"
                onClick={() => {
                  if (!user) {
                    toast.warning("Please login first!");
                    return router.push("/auth/login");
                  }
                  setIsModal(true);
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-4 rounded-md bg-white p-3 text-primary">
                  <div className="text-center text-lg leading-4">
                    Post Your Requirements <br />
                    <span className="text-xs  text-gray-400">
                      (Post you requirements, receive offers from sellers)
                    </span>
                  </div>
                  <span className="absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 rotate-45 bg-white"></span>
                </div>
                <div>
                  <Upload />
                </div>
                <div className="mt-1 text-[9px] leading-3">
                  Upload <br /> docs
                </div>
              </Button>
            </div>

            <Button
              type="button"
              className="mt-2 w-full text-wrap bg-white p-8 text-start text-xs text-primary shadow-md hover:bg-white/90 sm:text-sm lg:hidden"
              variant="primary"
              onClick={() => {
                if (!user) {
                  toast.warning("Please login first!");
                  return router.push("/auth/login");
                }
                setIsModal(true);
              }}
            >
              <div>
                <Upload className="mr-4" />
              </div>
              <div className="text-center text-lg leading-4">
                Post Your Requirements <br />
                <span className="text-xs  text-gray-400">
                  (Post you requirements, receive offers from sellers)
                </span>
              </div>
            </Button>
          </form>
          {inputVal && isResultsVisible && searchResults?.length > 0 && (
            <div className="absolute left-0 top-full z-10 max-h-48 w-full overflow-y-scroll rounded-bl-lg rounded-br-lg shadow-md">
              <ProductTable products={searchResults} user={user} />
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
        <RequirementForm
          handleCreate={handleCreate}
          filePath={filePath}
          setFilePath={setFilePath}
        />
      </Modal>
    </>
  );
}

export function ProductTable({ products, user }) {
  const { watch, control, getValues, setValue } = useForm({
    defaultValues: { products: [] },
  });
  const router = useRouter();
  const { fields } = useFieldArray({ control, name: "products" });

  // export const handleWhatsAppEnq = (
  //   customer_name,
  //   product_name,
  //   enqFor,
  //   filters,
  // ){}

  const sendWhatsAppEnq = async (data) => {
    return await http().post(
      `${endpoints.enquiries.getAll}/whatsapp/${data.id}`,
      data,
    );
  };

  const whatsAppEnqMutation = useMutation(sendWhatsAppEnq, {
    onSuccess: (data) => {
      toast.success(data?.message ?? "Enquiry sent");
    },
    onError: (error) => {
      console.error({ error });
      toast.error(error.message ?? "error");
    },
  });

  // const handleWhatsAppEnq = (e, id, enqFor) => {
  //   e.stopPropagation();
  //   if (!enqFor) return toast.warning("Please select enquiry for.");
  //   whatsAppEnqMutation.mutate({ id, enqFor });
  // };

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
              <Button
                size="icon"
                className="bg-[#00a884] text-white hover:bg-[#00a884]"
                onClick={(e) =>
                  // handleWhatsAppEnq(
                  //   e,
                  //   product._id,
                  //   watch(`products.${key}.item_type`),
                  // )
                  handleWhatsAppEnq(
                    user.name,
                    product.title,
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
