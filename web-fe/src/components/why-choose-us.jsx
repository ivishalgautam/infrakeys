"use client";
import React from "react";
import { H2, H3, P } from "./ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ShoppingCart, Star, Truck, Wallet } from "lucide-react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { CardContainer } from "./ui/3d-card";
SwiperCore.use([Autoplay]);

const size = 20;

const data = {
  buyer: [
    {
      title: "Get Lowest Price",
      content: "Access rates at least 1% lower than current market rates.",
      icon: <ShoppingCart size={size} />,
    },
    {
      title: "Get Credit",
      content:
        "Unlock working capital worry-free and grow with our credit solutions.",
      icon: <Wallet size={size} />,
    },
    {
      title: "Pan India & Global Reach",
      content:
        "Experience world-class fulfillment for both domestic and international markets.",
      icon: <Truck size={size} />,
    },
    {
      title: "Wide Range of Products",
      content:
        "Explore over 3 million SKUs from leading brands, all in one convenient place.",
      icon: <Star size={size} />,
    },
  ],
  seller: [
    {
      title: "Expand Your Business",
      content:
        "Access a global buyer base and achieve triple growth and beyond.",
      icon: <ShoppingCart size={size} />,
    },
    {
      title: "Advance Payments",
      content: "Receive upfront payments while we manage credit concerns.",
      icon: <Wallet size={size} />,
    },
    {
      title: "High Volume Orders",
      content:
        "Secure larger order volumes from our extensive global buyer network.",
      icon: <Truck size={size} />,
    },
    {
      title: "Efficient Fulfillment Services",
      content:
        "Streamline logistics management from start to finish, allowing you to focus on your core business.",
      icon: <Star size={size} />,
    },
  ],
};

export default function WhyChooseUs() {
  return (
    <div className="bg-white py-8">
      <div className="container">
        <H2 className={"text-center"}>Why Choose Us</H2>
        <div className="mt-2">
          <Tabs defaultValue="buyer" className="w-full">
            <div className="mb-8 flex items-center justify-center">
              <TabsList className="mx-auto w-full rounded-full bg-gray-100 text-center md:w-2/3 lg:w-1/4">
                {Object.keys(data).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="w-full rounded-full capitalize"
                  >
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {Object.keys(data).map((key) => (
              <TabsContent key={key} value={key}>
                <Cards data={data[key]} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export function Cards({ data }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.map((item, key) => (
        <CardContainer className={"h-full w-full cursor-pointer"} key={key}>
          <div className="flex h-full w-full flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8 text-black">
            <div className="flex items-center justify-end overflow-hidden rounded-full bg-gray-100 p-6 text-white">
              <div className={"rounded-full bg-primary p-3"}>{item.icon}</div>
            </div>
            <H3
              className={
                "relative text-center before:absolute before:-bottom-2 before:left-1/2 before:h-1 before:w-14 before:-translate-x-1/2 before:bg-primary"
              }
            >
              {item.title}
            </H3>
            <P className={"text-center text-sm font-medium text-gray-600"}>
              {item.content}
            </P>
          </div>
        </CardContainer>
      ))}
    </div>
  );
}
