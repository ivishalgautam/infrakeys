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
      content: "Get rates at least 1% lower than the existing market rates",
      icon: <ShoppingCart size={size} />,
    },
    {
      title: "Get Credit",
      content: "Do not worry about working capital. Grow with our credit",
      icon: <Wallet size={size} />,
    },
    {
      title: "Pan India & Global",
      content: "World-class fulfillment for domestic and international markets",
      icon: <Truck size={size} />,
    },
    {
      title: "Multi Brand SKUs",
      content: "One stop shop for 3L+ SKU from multiple brands",
      icon: <Star size={size} />,
    },
  ],
  seller: [
    {
      title: "Grow Your Business",
      content: "Get access to a global buyer base and grow 3x and more",
      icon: <ShoppingCart size={size} />,
    },
    {
      title: "Advance Payments",
      content: "Get your payments upfront and let us worry about the credit",
      icon: <Wallet size={size} />,
    },
    {
      title: "High Order Volumes",
      content: "Get bigger order volumes from our large global buyer base",
      icon: <Truck size={size} />,
    },
    {
      title: "Fulfillment Services",
      content: "End-to-end managed logistics while you focus on business",
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
