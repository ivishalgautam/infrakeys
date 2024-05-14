import { H2, H5, P } from "./ui/typography";
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
import Image from "next/image";

const data = [
  {
    title: "Buy & Sell With Us",
    content:
      "One stop solution for your raw material sourcing and selling needs",
    image: "/buy_sell.svg",
  },
  {
    title: "Raw Materials Prices",
    content: "Get live prices for the raw materials you deal in",
    image: "/raw_material.svg",
  },
  {
    title: "Raw Materials News",
    content: "Get daily raw material news & insights live from the ground",
    image: "/news.svg",
  },
  {
    title: "Grow With Credit",
    content: "Get access to credit for manufacturers and contractors",
    image: "/credit.svg",
  },
  {
    title: "Industry Digital First",
    content:
      "Transparency on your orders, live tracking & more with our app and web",
    image: "/tracking.svg",
  },
];

export default function OurServices() {
  return (
    <div className="bg-primary/5 py-8">
      <div className="container">
        <H2 className={"text-center"}>Our Services</H2>
        <div className="mt-10 grid grid-cols-1 gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
    <CardContainer className={"h-full w-full shadow-md"}>
      <div
        key={ind}
        className={cn(
          "group flex h-full w-full cursor-pointer flex-col gap-4 rounded-lg bg-white p-4 transition-colors ",
          {
            "sm:col-span-2 md:col-span-2 lg:col-span-1":
              ind === data.length - 1,
          },
        )}
      >
        <div className="space-y-4">
          <div className="text-primary group-hover:text-white">
            <figure className="relative h-32 w-full">
              <Image fill src={item.image} alt={item.title} />
            </figure>
          </div>
          <H5 className={"text-center text-primary"}>{item.title}</H5>
          <P className={"text-center text-sm"}>{item.content}</P>
        </div>
        <div className="mt-auto flex items-center justify-start gap-4 rounded-lg bg-primary px-4 py-2 text-white transition-all group-hover:shadow-lg">
          <span>Know more</span>
          <div className="transition-all group-hover:translate-x-3">
            <MoveRight />
          </div>
        </div>
      </div>
    </CardContainer>
  );
}
