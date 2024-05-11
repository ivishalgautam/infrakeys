import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Muted, Small } from "../ui/typography";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Boxes } from "lucide-react";
import { Badge } from "../ui/badge";
import { isObject } from "@/utils/object";

export default function CartItemTable({
  fields,
  register,
  errors,
  control,
  handleDelete,
}) {
  return (
    <div>
      <Table>
        <TableCaption>{fields?.length === 0 && "Empty"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[280px]">Quantity</TableHead>
            <TableHead className="">Filters</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields?.map((field, key) => (
            <TableRow key={field.id}>
              <TableCell className="p-2">
                <Small className={"text-xs"}>{field.title}</Small>
              </TableCell>

              <TableCell className="p-2">
                <div className="flex items-center justify-start rounded-lg border bg-[#efefef] p-1 py-0.5">
                  <div className="rounded-lg bg-white p-2 text-black">
                    <Boxes size={20} />
                  </div>
                  <Input
                    type="number"
                    {...register(`items.${key}.quantity`, {
                      required: "Enter quantity",
                      valueAsNumber: true,
                    })}
                    placeholder="Quantity"
                    className="border-none bg-transparent placeholder:text-xs"
                  />
                  <div className="">
                    <Controller
                      control={control}
                      name={`items.${key}.quantity_type`}
                      maxMenuHeight={230}
                      rules={{ required: "Select measurement" }}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          value={value}
                          onValueChange={onChange}
                          className=" bg-white"
                        >
                          <SelectTrigger className="w-[100px] bg-white uppercase">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {field.quantity_types?.map((item) => (
                                <SelectItem
                                  key={item}
                                  value={item}
                                  className="uppercase"
                                >
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {errors?.items?.[key]?.quantity && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]["quantity"].message}
                    </Small>
                  )}
                  {errors?.items?.[key]?.quantity_type && (
                    <Small className={"text-red-500"}>
                      {errors.items[key]["quantity_type"].message}
                    </Small>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="flex flex-wrap items-start justify-start gap-2">
                  {isObject(field.filters) &&
                    Object.keys(field?.filters)?.map((key, ind) => (
                      <div key={ind} className="rounded-md border p-1">
                        <Muted className={"text-xs uppercase"}>{key}:</Muted>
                        <div className="space-x-1">
                          {field.filters[key]?.map((value, ind) => {
                            return (
                              <Badge key={ind} className={"uppercase"}>
                                {value}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </TableCell>

              <TableCell className="p-2 text-right">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete({ id: field._id })}
                >
                  <MdDelete size={20} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {fields?.length ? (
        <div className="space-y-2 border-t-2 border-primary pt-8">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <Label>Pincode</Label>
              <Input
                type="number"
                {...register("pincode", {
                  required: "required*",
                  valuesAsNumber: true,
                })}
                placeholder="Enter pincode"
              />
              {errors?.pincode && (
                <Small className={"text-red-500"}>
                  {errors.pincode.message}
                </Small>
              )}
            </div>
            <div>
              <Label>Delivery summary</Label>
              <Textarea
                {...register("delivery_summary")}
                placeholder="Enter delivery summary"
              ></Textarea>
            </div>
            {/* delivery time */}
            <div>
              <Label>Delivery time</Label>
              <Controller
                control={control}
                maxMenuHeight={230}
                name="delivery_time"
                rules={{ required: "Select delivery time" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onValueChange={onChange}
                    className="bg-white"
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select delivery time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          "Immediate ( 2-3 Working Days)",
                          "Within 1 Week",
                          "Within 15 Days",
                          "Within 1 Month",
                        ].map((item, key) => (
                          <SelectItem key={key} value={item} className="">
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.delivery_time && (
                <Small className={"text-red-500"}>
                  {errors.delivery_time.message}
                </Small>
              )}
            </div>

            {/* payment method */}
            <div>
              <Label>Payment method</Label>
              <Controller
                control={control}
                maxMenuHeight={230}
                name="payment_method"
                rules={{ required: "Select payment method" }}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onValueChange={onChange}
                    className="bg-white"
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"advance"} className="">
                          Advance
                        </SelectItem>
                        <SelectItem value={"bank_guarantee"} className="">
                          Bank Guarantee
                        </SelectItem>
                        <SelectItem value={"letter_of_credit"} className="">
                          Letter of Credit
                        </SelectItem>
                        <SelectItem value={"channel_financing"} className="">
                          Channel Financing
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors?.payment_method && (
                <Small className={"text-red-500"}>
                  {errors.payment_method.message}
                </Small>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
