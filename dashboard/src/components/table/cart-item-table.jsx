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
import { Boxes, DivideIcon, Scale } from "lucide-react";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import ReactSelect from "react-select";
import { useFetchRequirements } from "@/hooks/useFetchRequirements";

export default function CartItemTable({
  fields,
  register,
  errors,
  control,
  handleDelete,
}) {
  const { data: customers } = useFetchUsers("user");
  const { data: requirements } = useFetchRequirements();
  const formattedRequirements = requirements?.map(
    ({ id: value, requirement_id: label }) => ({ value, label })
  );

  return (
    <div>
      {/* user id */}
      <div>
        <Label>Customers</Label>
        <Controller
          control={control}
          name={`user_id`}
          maxMenuHeight={230}
          rules={{ required: "Select measurement" }}
          render={({ field: { onChange, value } }) => (
            <Select value={value} onValueChange={onChange} className="">
              <SelectTrigger className="">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {customers?.map(({ id, name, phone }) => (
                    <SelectItem key={id} value={id} className="uppercase">
                      {`${name} (${phone})`}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* reference id */}
      <div>
        <Label>Reference</Label>
        <Controller
          control={control}
          name={`requirement_reference`}
          maxMenuHeight={230}
          render={({ field: { onChange, value } }) => (
            <ReactSelect
              onChange={onChange}
              value={value}
              options={formattedRequirements}
            />
          )}
        />
      </div>

      <Table>
        <TableCaption>{fields?.length === 0 && "Empty"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Quantity</TableHead>
            {/* <TableHead className="w-[250px]">Measurement</TableHead> */}
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields?.map((field, key) => (
            <TableRow key={field.id}>
              <TableCell className="p-2">
                <div>{field.title}</div>
                <Muted className={"text-xs capitalize"}>
                  {field.brand_name}
                </Muted>
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
                          className="w-auto bg-white"
                        >
                          <SelectTrigger className="w-auto bg-white uppercase">
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

              <TableCell className="p-2">
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
        <div className="space-y-2">
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
