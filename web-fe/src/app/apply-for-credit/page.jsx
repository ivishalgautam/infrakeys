import ApplyForCredit from "@/components/apply-for-credit";
import CreditBenefits from "@/components/credit-benefits";
import ApplyForCreditForm from "@/components/forms/apply-for-credit";
import { H1, H2, H3, H5, H6, P } from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

const benefits = [
  {
    title: "No Collateral Required",
    content:
      "Secure the funds you need without the burden of providing collateral.",
    icon: "/collateral.svg",
  },
  {
    title: "Lowest Interest Rate Guaranteed",
    content: "Enjoy the lowest interest rates in the market, guaranteed.",
    icon: "/interest.svg",
  },
  {
    title: "No Processing Fees",
    content: "Save more with zero processing fees on your loan.",
    icon: "/processing_fee.svg",
  },
  {
    title: "Hassle-Free Procurement",
    content: "Experience a smooth and hassle-free loan procurement process.",
    icon: "/procurement.svg",
  },
  {
    title: "Avail Up to 5 Crore Funds",
    content: "Access up to 5 crore in funds to support your business needs.",
    icon: "/funds.svg",
  },
  {
    title: "Payment Credit into 90 Days",
    content:
      "Get your payment credited within 90 days, ensuring quick access to your funds.",
    icon: "/payment_credit.svg",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="grid grid-cols-4 gap-4 ">
          <div className="col-span-4 flex items-center justify-center md:col-span-2 md:justify-start">
            <H2 className={"text-center md:text-start"}>
              <span className="text-5xl font-bold">
                GET Credit upto <span className="text-primary"> 5CR</span>
              </span>
              <br />
              <span className="text-gray-700">
                {" "}
                For Hassle Free Procurement
              </span>
            </H2>
          </div>
          <div className="col-span-4 rounded-lg bg-white p-8 md:col-span-2">
            <ApplyForCreditForm />
          </div>
        </div>
        <div className="mt-4">
          <CreditBenefits benefits={benefits} />
        </div>
      </div>
    </div>
  );
}
