import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import { H6 } from "../ui/typography";

export default function OrderItemTable({ data }) {
  return (
    <div className="space-y-4 rounded-md border">
      <H6 className={"px-4 pt-4"}>Enquiry item details</H6>
      <div className="space-y-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Product</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Base rate</TableHead>
              <TableHead className="text-right">GST</TableHead>
              <TableHead className="flex items-center justify-end gap-2">
                <span>Total amount</span>
              </TableHead>
              <TableHead>Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/products/${item.product_slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {item.product_title}
                  </Link>
                </TableCell>
                <TableCell className={"uppercase"}>
                  <Badge
                    className={cn("cursor-pointer text-center text-white", {
                      "border-yellow-200 bg-yellow-100 text-yellow-500 hover:bg-yellow-200":
                        item.status === "pending",
                      "border-rose-200 bg-rose-100 text-rose-500 hover:bg-rose-200":
                        item.status === "not_available",
                      "border-emerald-200 bg-emerald-100 text-emerald-500 hover:bg-emerald-200":
                        item.status === "available",
                      "border-orange-200 bg-orange-100 text-orange-500 hover:bg-orange-200":
                        item.status === "partially_available",
                    })}
                  >
                    {item.status.split("_").join(" ")}
                  </Badge>
                </TableCell>
                <TableCell
                  className={"uppercase"}
                >{`${item?.quantity} ${item?.quantity_type}`}</TableCell>
                <TableCell>{item?.base_rate ?? "N/A"}</TableCell>
                <TableCell className="text-right">
                  {item?.gst_percentage ?? "N/A"}
                </TableCell>
                <TableCell className="flex items-center justify-end gap-1">
                  {isNaN(item?.total_amount) ? (
                    "N/A"
                  ) : (
                    <IndianRupee size={13} />
                  )}
                  <span>
                    {isNaN(item?.total_amount) ? "N/A" : item?.total_amount}
                  </span>
                </TableCell>
                <TableCell>{item?.comment ?? "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>Total</TableCell>
              <TableCell className="flex items-center justify-end gap-1">
                {isNaN(data?.order_amount) ? "N/A" : <IndianRupee size={13} />}
                <span>
                  {isNaN(data?.order_amount) ? "N/A" : data?.order_amount}
                </span>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
