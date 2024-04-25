"use client";
import { MainContext } from "@/store/context";
import React, { useContext } from "react";
import { H3, H4, H5, H6, Muted, P, Small } from "./ui/typography";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { Progress } from "./ui/progress";
import moment from "moment";
import { calculateProgress } from "@/lib/calculate-progress";
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

async function fetchOrders() {
  const { data } = await http().get(`${endpoints.orders.getAll}`);
  return data;
}

export default function Orders() {
  const params = useSearchParams();
  const status = params.get("status");
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchOrders,
    queryKey: ["orders"],
  });

  const pendingOrders = data?.filter((item) => item.status === "pending");
  const inTransitOrders = data?.filter((item) => item.status === "in_transit");
  const deliveredOrders = data?.filter((item) => item.status === "delivered");

  return (
    <div className="space-y-4">
      <div>
        <TopBar
          status={status}
          {...{ pendingOrders, inTransitOrders, deliveredOrders }}
        />
      </div>
      <div>
        {isLoading && <Spinner />}
        {status === "pending_orders" && (
          <div>
            <H3>Orders pending</H3>
            <div>
              <OrdersTable orders={pendingOrders} />
            </div>
          </div>
        )}

        {status === "in_transit" && (
          <div>
            <H3>In Transit</H3>
            <div>
              <OrdersTable orders={inTransitOrders} />
            </div>
          </div>
        )}
        {status === "delivered" && (
          <div>
            <H3>Delivered</H3>
            <div>
              <OrdersTable orders={deliveredOrders} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function TopBar({
  status,
  pendingOrders,
  inTransitOrders,
  deliveredOrders,
}) {
  const data = [
    {
      name: "Pending",
      slug: "pending_orders",
      icon: <TimerReset />,
      count: pendingOrders?.length ?? 0,
    },
    {
      name: "In Transit",
      slug: "in_transit",
      icon: <FileText />,
      count: inTransitOrders?.length ?? 0,
    },
    {
      name: "Delivered",
      slug: "delivered",
      icon: <ShieldCheck />,
      count: deliveredOrders?.length ?? 0,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {data?.map(({ name, slug, icon, count }) => (
        <Link
          href={`/profile/orders?status=${slug}`}
          key={slug}
          className={cn(
            "flex items-center justify-start gap-4 rounded-md border border-gray-300 bg-gray-50 p-4 transition-colors hover:bg-gray-100",
            {
              "border-yellow-500 bg-yellow-50 hover:bg-yellow-100":
                status === "pending_orders" && slug === "pending_orders",
              "border-orange-500 bg-orange-50 hover:bg-orange-100":
                status === "in_transit" && slug === "in_transit",
              "border-emerald-500 bg-emerald-50 hover:bg-emerald-100":
                status === "delivered" && slug === "delivered",
            },
          )}
        >
          <div
            className={cn({
              "border-yellow-500 text-yellow-500":
                status === "pending_orders" && slug === "pending_orders",
              "border-emerald-500 text-emerald-500":
                status === "delivered" && slug === "delivered",
              "border-orange-500 text-orange-500":
                status === "in_transit" && slug === "in_transit",
            })}
          >
            {icon}
          </div>
          <div>{name}</div>
          <Badge
            className={cn("ml-auto text-white", {
              "bg-yellow-500":
                status === "pending_orders" && slug === "pending_orders",
              "bg-orange-500": status === "in_transit" && slug === "in_transit",
              "bg-emerald-500": status === "delivered" && slug === "delivered",
            })}
          >
            {count}
          </Badge>
        </Link>
      ))}
    </div>
  );
}

export function OrdersTable({ orders }) {
  if (orders?.length === 0) {
    return <Muted className={"mt-2"}>No orders found.</Muted>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Order Id</TableHead>
          <TableHead className="text-left">Status</TableHead>
          <TableHead className="text-left">Order date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((enq) => (
          <TableRow key={enq.id}>
            <TableCell className="text-left font-medium">
              <Link
                href={`/orders/${enq.id}/detail`}
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
                    enq.status === "delivered",
                  "border-yellow-300 bg-yellow-100 text-yellow-500 hover:bg-yellow-200":
                    !enq.status === "pending",
                  "border-orange-300 bg-orange-100 text-orange-500 hover:bg-orange-200":
                    !enq.status === "in_transit",
                })}
              >
                {enq.status.split("_").join(" ")}
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
