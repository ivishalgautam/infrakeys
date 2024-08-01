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
import { IoDocumentAttachOutline } from "react-icons/io5";

export const columns = (setRequirementId, handleDelete) => [
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
      const id = row.original.id;
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
