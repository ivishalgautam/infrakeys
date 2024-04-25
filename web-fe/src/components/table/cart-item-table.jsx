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
import { Boxes, Scale } from "lucide-react";

export default function CartItemTable({
  fields,
  register,
  errors,
  control,
  handleDelete,
}) {
  return (
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
              <Muted className={"text-xs capitalize"}>{field.brand_name}</Muted>
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
        <TableRow>
          <TableCell className="p-2" colSpan="4">
            <Label>Delivery summary</Label>
            <Textarea
              {...register("delivery_summary")}
              placeholder="Enter delivery summary"
            ></Textarea>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
