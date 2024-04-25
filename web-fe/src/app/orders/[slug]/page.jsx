"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { H2 } from "@/components/ui/typography";
import Spinner from "@/components/Spinner";

export default function Page({ params: { slug } }) {
  const { data, isLoading } = useQuery({
    queryFn: fetchOrderItems,
    queryKey: ["orders"],
    enabled: !!slug,
  });

  async function fetchOrderItems() {
    const { data } = await http().get(`${endpoints.orders.getAll}/${slug}`);
    return data;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container rounded-md bg-white p-4">
      <Table>
        {data?.items?.length === 0 && <TableCaption>Empty</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Dispatched quantity</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.items?.map((field) => (
            <TableRow key={field.id}>
              {/* image */}
              <TableCell>
                <div className="relative size-14 overflow-hidden rounded-md">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${field.pictures[0]}`}
                    fill
                    alt={field.title}
                  />
                </div>
              </TableCell>

              {/* name */}
              <TableCell>
                <Link
                  href={`/products/${field.slug}`}
                  className="hover:text-primary"
                >
                  {field.title}
                </Link>
              </TableCell>

              {/* quantity */}
              <TableCell>{field.quantity}</TableCell>

              {/* dispatched quantity */}
              <TableCell>{field.dispatched_quantity}</TableCell>

              {/* comment */}
              <TableCell>{field.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-8">
        <H2>{data?.status?.split("_").join(" ")}</H2>
      </div>
    </div>
  );
}
