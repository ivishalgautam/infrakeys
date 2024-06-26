import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import moment from "moment";
import { H6 } from "../ui/typography";
import { rupee } from "@/lib/Intl";

export default function SingleOrderTable({ data }) {
  return (
    <div className="rounded-md border">
      <H6 className={"px-4 pt-4"}>{data?.id}</H6>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Amt.</TableHead>
              <TableHead>Enquiry date</TableHead>
              <TableHead>Deliver summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{rupee.format(data?.order_amount)}</TableCell>
              <TableCell>
                {moment(data?.created_at).format("Do MMMM YYYY, h:mm a")}
              </TableCell>
              <TableCell>{data?.delivery_summary ?? "N/A"}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
