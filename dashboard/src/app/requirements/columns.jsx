"use client";
import { Button } from "../../components/ui/button";
import { ArrowUpDown, Copy } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoDocumentAttachOutline } from "react-icons/io5";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "sonner";

export const columns = (setRequirementId, handleDelete, handleNavigate) => [
  {
    accessorKey: "requirement_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const requirement_id = row.original.requirement_id;
      return (
        <div className={`capitalize flex items-center justify-start gap-2`}>
          <Badge>{requirement_id}</Badge>
          <CopyToClipboard text={requirement_id}>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => toast.success("Copied")}
            >
              <Copy size={13} />
            </Button>
          </CopyToClipboard>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("name")}</span>;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <Button variant="ghost">Phone</Button>;
    },
    cell: ({ row }) => {
      return <span className="capitalize">{row.getValue("phone")}</span>;
    },
  },
  {
    accessorKey: "docs",
    header: ({ column }) => {
      return <Button variant="ghost">Documents</Button>;
    },
    cell: ({ row }) => {
      return (
        <a
          size="icon"
          variant="outline"
          href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${row.getValue("docs")[0]}`}
          target="_blank"
        >
          <IoDocumentAttachOutline size={25} className="text-primary" />
        </a>
      );
    },
  },
  {
    accessorKey: "order_id",
    header: ({ column }) => {
      return <Button variant="ghost">Order</Button>;
    },
    cell: ({ row }) => {
      const id = row.original.order_id;
      return id ? (
        <Badge
          onClick={() => handleNavigate(`/orders/${id}`)}
          className={"cursor-pointer"}
        >
          {id}
        </Badge>
      ) : (
        "No Order"
      );
    },
  },
  {
    accessorKey: "enquiry_id",
    header: ({ column }) => {
      return <Button variant="ghost">Enquiry</Button>;
    },
    cell: ({ row }) => {
      const id = row.original.enquiry_id;
      return id ? (
        <Badge
          onClick={() => handleNavigate(`/enquiries/${id}`)}
          className={"cursor-pointer"}
        >
          {id}
        </Badge>
      ) : (
        "No Enquiry"
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
      const id = row.original.id;
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
            <DropdownMenuItem
              onClick={() => {
                setRequirementId(id);
                openModal();
              }}
            >
              <a
                size="icon"
                variant="outline"
                href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${row.getValue("docs")[0]}`}
                target="_blank"
              >
                View
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                handleDelete(id);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
