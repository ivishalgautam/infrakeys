import React from "react";
import { H2, H3, H5, H6, P } from "./ui/typography";
import {
  AreaChart,
  Lightbulb,
  MoveRight,
  ShoppingCart,
  Wallet,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CardContainer } from "./ui/3d-card";

const data = [
  {
    title: "Buy & Sell With Us",
    content:
      "One stop solution for your raw material sourcing and selling needs",
    icon: <ShoppingCart size={30} />,
  },
  {
    title: "Raw Materials Prices",
    content: "Get live prices for the raw materials you deal in",
    icon: <AreaChart size={30} />,
  },
  {
    title: "Raw Materials News",
    content: "Get daily raw material news & insights live from the ground",
    icon: <Zap size={30} />,
  },
  {
    title: "Grow With Credit",
    content: "Get access to credit for manufacturers and contractors",
    icon: <Wallet size={30} />,
  },
  {
    title: "Industry Digital First",
    content:
      "Transparency on your orders, live tracking & more with our app and web",
    icon: <Lightbulb size={30} />,
  },
];

export default function OurServices() {
  return (
    <div className="pb-8">
      <div className="container">
        <H2 className={"text-center"}>Our Services</H2>
        <div className="mt-10 grid grid-cols-1 rounded-xl border border-primary bg-white p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {data.map((item, ind) => (
            <Card item={item} ind={ind} key={ind} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Card({ item, ind }) {
  return (
    <CardContainer className={"h-full w-full"}>
      <div
        key={ind}
        className={cn(
          "group flex h-full cursor-pointer flex-col gap-4 rounded-lg p-4 transition-colors hover:bg-primary hover:text-white",
          {
            "sm:col-span-2 md:col-span-2 lg:col-span-1":
              ind === data.length - 1,
          },
        )}
      >
        <div className="space-y-4">
          <div className="text-primary group-hover:text-white">{item.icon}</div>
          <H5>{item.title}</H5>
          <P>{item.content}</P>
        </div>
        <div className="mt-auto flex items-center justify-start gap-4 rounded-lg bg-primary px-4 py-2 text-white transition-all  group-hover:bg-white group-hover:text-primary group-hover:shadow-lg">
          <span>Know more</span>
          <div className="transition-all group-hover:translate-x-3">
            <MoveRight />
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
