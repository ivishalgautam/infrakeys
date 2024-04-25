"use client";
import React, { useState } from "react";
import Image from "next/image";
import { H6 } from "../ui/typography";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Modal from "../Modal";
import QueryForm from "../forms/query";
import AddToCart from "../forms/add-to-cart";

export default function ProductCard({
  id,
  slug,
  title,
  type,
  category_name,
  category_slug,
  brand_name,
  brand_slug,
}) {
  const [isModal, setIsModal] = useState(false);
  const [enquirytype, setEnquirytype] = useState("");

  const openModal = () => {
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const handleOnClick = async (enquiryType) => {
    setEnquirytype(enquiryType);
    openModal(true);
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-lg border bg-white p-3 shadow-sm">
        <div className="relative flex flex-col space-y-4">
          <Link
            href={`/categories/${category_slug}`}
            className="right-0 top-0 rounded-lg bg-primary p-2 py-1 text-xs uppercase text-white transition-colors"
          >
            {category_name}
          </Link>

          <div>
            <Link href={`/products/${slug}`}>
              <H6 className={"text-center text-sm"}>{title}</H6>
            </Link>

            <div className="text-center text-xs text-gray-400">
              <span className="font-semibold">Brand: </span>
              <Link
                href={`/brands/${brand_slug}`}
                className="capitalize transition-colors hover:text-primary"
              >
                {brand_name}
              </Link>
            </div>
          </div>

          <div className="flex w-full items-center justify-center gap-2">
            <AddToCart id={id} />
          </div>
        </div>
      </div>
      {isModal && (
        <Modal
          isOpen={isModal}
          onClose={closeModal}
          className={"w-full max-w-96"}
        >
          <QueryForm
            type={"vertical"}
            enquirytype={enquirytype}
            productId={id}
          />
        </Modal>
      )}
    </>
  );
}
