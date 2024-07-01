import { H2, H5, P } from "./ui/typography";
import { cn } from "@/lib/utils";
import { CardContainer } from "./ui/3d-card";
import Image from "next/image";

const data = [
  {
    title: "Buy & Sell With Us",
    content:
      "Discover a seamless solution for all your raw material sourcing and selling needs.",
    image: "/buy_sell.svg",
  },
  {
    title: "Live Raw Materials Prices",
    content:
      "Access real-time prices for the raw materials essential to your operations.",
    image: "/raw_material.svg",
    ribbon: "Coming soon",
  },
  {
    title: "Daily Raw Materials News",
    content:
      "Stay informed with daily news and insights directly from the industry.",
    image: "/news.svg",
    ribbon: "Coming soon",
  },
  {
    title: "Grow With Accessible Credit",
    content:
      "Gain access to credit tailored for manufacturers and contractors, facilitating growth opportunities.",
    image: "/credit.svg",
  },
  {
    title: "Industry-Leading Digital Solutions",
    content:
      "Experience transparency in your orders, live tracking, and more through our advanced app and web platforms.",
    image: "/tracking.svg",
  },
];

export default function OurServices() {
  return (
    <div className="bg-primary/5 py-8">
      <div className="container">
        <H2 className={"text-center"}>Our Services</H2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
    <CardContainer className={"relative h-full w-full shadow-md"}>
      {item.ribbon && (
        <span className="absolute left-0 top-2 z-10 rounded-br rounded-tr bg-primary px-2 py-1 text-xs text-white">
          {item.ribbon}
        </span>
      )}
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
          <H5 className={"h-[56px] text-center text-primary"}>{item.title}</H5>
          <P className={"text-center text-sm"}>{item.content}</P>
        </div>
        {/* <div className="mt-auto flex items-center justify-start gap-4 rounded-lg bg-primary px-4 py-2 text-white transition-all group-hover:shadow-lg">
          <span>Know more</span>
          <div className="transition-all group-hover:translate-x-3">
            <MoveRight />
          </div>
        </div> */}
      </div>
    </CardContainer>
  );
}
