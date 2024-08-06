"use client";
import { Button } from "../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import moment from "moment";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns = (handleDelete, handleNavigate) => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <Button variant="ghost">Enquiry Id</Button>;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <Badge
          className={"text-white cursor-pointer"}
          onClick={() => handleNavigate(`/enquiries/${id}`)}
        >
          {id}
        </Badge>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="text-xs">{row.getValue("phone")}</span>;
    },
  },
  {
    accessorKey: "enquiry_type",
    header: ({ column }) => {
      return <Button variant="ghost">Enquiry for</Button>;
    },
    cell: ({ row }) => {
      const type = row.getValue("enquiry_type");
      return (
        <div>
          <Badge
            type="button"
            className={cn("uppercase cursor-pointer border", {
              "bg-emerald-100 text-emerald-500 hover:bg-emerald-200 border-emerald-300":
                type === "buy",
              "bg-rose-100 text-rose-500 hover:bg-rose-200 border-rose-300":
                type === "sell",
            })}
          >
            {type}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "is_converted_to_order",
    header: ({ column }) => {
      return <Button variant="ghost">Converted to order</Button>;
    },
    cell: ({ row }) => {
      const is_converted_to_order = row.getValue("is_converted_to_order");
      return (
        <Badge
          type="button"
          className={cn("uppercase cursor-pointer border-[0.1px]", {
            "bg-emerald-100 text-emerald-500 hover:bg-emerald-200 border-emerald-300":
              is_converted_to_order,
            "bg-rose-100 text-rose-500 hover:bg-rose-200 border-rose-300":
              !is_converted_to_order,
          })}
        >
          {is_converted_to_order ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => {
      return <Button variant="ghost">Payment method</Button>;
    },
    cell: ({ row }) => {
      const type = row.getValue("payment_method");
      return (
        <div>
          <Badge
            type="button"
            className={cn("capitalize cursor-pointer border-[0.1px]")}
          >
            {type.split("_").join(" ")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <Button variant="ghost">Status</Button>;
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div>
          <Badge
            className={cn("capitalize text-white", {
              "bg-emerald-500 hover:bg-emerald-500/80": status === "available",
              "bg-orange-500 hover:bg-orange-500/80": status === "pending",
              "bg-rose-500 hover:bg-rose-500/80": status === "not_available",
              "bg-blue-500 hover:bg-blue-500/80":
                status === "partially_available",
              "bg-red-500 hover:bg-red-500/80": status === "closed",
            })}
          >
            {status.split("_").join(" ")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "reference",
    header: ({ column }) => {
      return <Button variant="ghost">Reference</Button>;
    },
    cell: ({ row }) => {
      const reference = row.original.reference;
      console.log({ reference });
      return (
        <div>
          {reference.length ? (
            <a
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${reference?.[0].docs?.[0]}`}
            >
              <Badge className={cn("capitalize")}>
                {reference?.[0]?.requirement_id}
              </Badge>
            </a>
          ) : (
            "No reference"
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <Button variant="ghost">Created At</Button>;
    },
    cell: ({ row }) => {
      return (
        <div>{moment(row.getValue("created_at")).format("DD/MM/YYYY")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDelete({ id })}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
