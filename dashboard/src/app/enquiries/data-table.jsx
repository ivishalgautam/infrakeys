"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function DataTable({ columns, data, searchParams, handleSearch }) {
  const [sorting, setSorting] = React.useState([]);
  const router = useRouter();
  const [columnFilters, setColumnFilters] = React.useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4 gap-2 flex-wrap">
        {/* <div>
          <Input
            placeholder="Filter by"
            value={table?.getColumn("phone")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("phone")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div> */}
        <div>
          <Label>Enquiry for</Label>
          <Select
            defaultValue={searchParams["enquiry_type"] ?? ""}
            onValueChange={(value) => {
              handleSearch("enquiry_type", value);
              table.getColumn("enquiry_type")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Enquiry for" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Coverted to order</Label>
          <Select
            defaultValue={searchParams["is_converted_to_order"] ?? ""}
            onValueChange={(value) => {
              handleSearch("is_converted_to_order", value);
              table.getColumn("is_converted_to_order")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Coverted to order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={true}>Yes</SelectItem>
              <SelectItem value={false}>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Payment method</Label>
          <Select
            defaultValue={searchParams["payment_method"] ?? ""}
            onValueChange={(value) => {
              handleSearch("payment_method", value);
              table.getColumn("payment_method")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"advance"}>Advance</SelectItem>
              <SelectItem value={"bank_guarantee"}>Bank Guarantee</SelectItem>
              <SelectItem value={"letter_of_credit"}>
                Letter of Credit
              </SelectItem>
              <SelectItem value={"channel_financing"}>
                Channel Financing
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Status</Label>
          <Select
            defaultValue={searchParams["status"] ?? ""}
            onValueChange={(value) => {
              handleSearch("status", value);
              table.getColumn("status")?.setFilterValue(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="partially_available">
                Partially available
              </SelectItem>
              <SelectItem value="not_available">Not available</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-auto">
          <Button onClick={() => router.push("/enquiries")}>Reset</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.previousPage()}
          disabled={!table?.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.nextPage()}
          disabled={!table?.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
