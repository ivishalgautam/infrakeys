"use client";
import { H3, H6, Muted, Small } from "./ui/typography";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import Spinner from "./Spinner";
import { FileText, ShieldCheck, TimerReset } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

async function fetchEnquiries() {
  const { data } = await http().get(`${endpoints.enquiries.getAll}`);
  return data;
}

export default function Tracking() {
  const params = useSearchParams();
  const status = params.get("status");
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchEnquiries,
    queryKey: ["enquiries"],
  });

  const pendingEnquiries = data?.filter((item) => item.status === "pending");
  const availableEnquiries = data?.filter(
    (item) => item.status === "available",
  );
  const partiallyAvailable = data?.filter(
    (item) => item.status === "partially_available",
  );
  const notAvailable = data?.filter((item) => item.status === "not_available");
  const closedEnquiries = data?.filter((item) => item.status === "closed");

  return (
    <div className="space-y-4">
      <div>
        <TopBar
          status={status}
          {...{
            pendingEnquiries,
            availableEnquiries,
            partiallyAvailable,
            notAvailable,
            closedEnquiries,
          }}
        />
      </div>
      <div>
        {isLoading && <Spinner />}
        {status === "pending_enquiry" && (
          <div>
            <H3>Orders pending</H3>
            <div>
              <Enquiries enquiries={pendingEnquiries} />
            </div>
          </div>
        )}

        {status === "partially_available" && (
          <div>
            <H3>Partially available</H3>
            <div>
              <Enquiries enquiries={partiallyAvailable} />
            </div>
          </div>
        )}
        {status === "not_available" && (
          <div>
            <H3>Not Available</H3>
            <div>
              <Enquiries enquiries={notAvailable} />
            </div>
          </div>
        )}
        {status === "available" && (
          <div>
            <H3>Available</H3>
            <div>
              <Enquiries enquiries={availableEnquiries} />
            </div>
          </div>
        )}
        {status === "closed" && (
          <div>
            <H3>Closed enquiries</H3>
            <div>
              <Enquiries enquiries={closedEnquiries} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function TopBar({
  status,
  pendingEnquiries,
  availableEnquiries,
  partiallyAvailable,
  notAvailable,
  closedEnquiries,
}) {
  const data = [
    {
      name: "Pending Enquiry",
      slug: "pending_enquiry",
      icon: <TimerReset />,
      count: pendingEnquiries?.length,
    },
    {
      name: "Partially available",
      slug: "partially_available",
      icon: <FileText />,
      count: partiallyAvailable?.length,
    },
    {
      name: "Not available",
      slug: "not_available",
      icon: <ShieldCheck />,
      count: notAvailable?.length,
    },
    {
      name: "Available",
      slug: "available",
      icon: <ShieldCheck />,
      count: availableEnquiries?.length,
    },
    {
      name: "Closed",
      slug: "closed",
      icon: <ShieldCheck />,
      count: closedEnquiries?.length,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {data?.map(({ name, slug, icon, count }) => (
        <Link
          href={`/profile/enquiries?status=${slug}`}
          key={slug}
          className={cn(
            "flex items-center justify-start gap-4 rounded-md border border-gray-300 bg-gray-50 p-4 transition-colors hover:bg-gray-100",
            {
              "border-yellow-500 bg-yellow-50 hover:bg-yellow-100":
                status === "pending_enquiry" && slug === "pending_enquiry",
              "border-orange-500 bg-orange-50 hover:bg-orange-100":
                status === "partially_available" &&
                slug === "partially_available",
              "border-emerald-500 bg-emerald-50 hover:bg-emerald-100":
                status === "available" && slug === "available",
              "border-red-500 bg-red-50 hover:bg-red-100":
                status === "not_available" && slug === "not_available",
              "border-rose-500 bg-rose-50 hover:bg-rose-100":
                status === "closed" && slug === "closed",
            },
          )}
        >
          <div
            className={cn({
              "border-yellow-500 text-yellow-500":
                status === "pending_enquiry" && slug === "pending_enquiry",
              "border-orange-500 text-orange-500":
                status === "partially_available" &&
                slug === "partially_available",
              "border-emerald-500 text-emerald-500":
                status === "available" && slug === "available",
              "border-red-500 text-red-500":
                status === "not_available" && slug === "not_available",
              "border-rose-500 text-rose-500":
                status === "closed" && slug === "closed",
            })}
          >
            {icon}
          </div>
          <div>{name}</div>
          <Badge
            className={cn("ml-auto text-white", {
              "bg-yellow-500":
                status === "pending_enquiry" && slug === "pending_enquiry",
              "bg-orange-500":
                status === "partially_available" &&
                slug === "partially_available",
              "bg-emerald-500": status === "available" && slug === "available",
              "bg-red-500":
                status === "not_available" && slug === "not_available",
              "bg-rose-500": status === "closed" && slug === "closed",
            })}
          >
            {count}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

export function Enquiries({ enquiries }) {
  if (enquiries?.length === 0) {
    return <Muted className={"mt-2"}>No enquiries found.</Muted>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Enquiry Id</TableHead>
          <TableHead className="text-left">Converted to order</TableHead>
          <TableHead className="text-left">Enquiry date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enquiries?.map((enq) => (
          <TableRow key={enq.id}>
            <TableCell className="text-left font-medium">
              <Link
                href={
                  enq.is_converted_to_order
                    ? "#"
                    : `/enquiries/${enq.id}/detail`
                }
                className="rounded-lg bg-primary px-2 py-1 text-white transition-colors hover:bg-primary/80"
              >
                {enq.id}
              </Link>
            </TableCell>
            <TableCell>
              <Badge
                type="button"
                className={cn("cursor-pointer border-[0.1px] uppercase", {
                  "border-emerald-300 bg-emerald-100 text-emerald-500 hover:bg-emerald-200":
                    enq.is_converted_to_order,
                  "border-rose-300 bg-rose-100 text-rose-500 hover:bg-rose-200":
                    !enq.is_converted_to_order,
                })}
              >
                {enq.is_converted_to_order ? "Yes" : "No"}
              </Badge>
            </TableCell>
            <TableCell>
              {moment(enq?.created_at).format("Do MMMM YYYY, h:mm a")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
