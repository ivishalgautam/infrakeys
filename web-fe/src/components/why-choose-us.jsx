"use client";
import React from "react";
import { H2, H3, H4, H6, P } from "./ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ShoppingCart, Star, Truck, Wallet } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { CardContainer } from "./ui/3d-card";
import { cn } from "@/lib/utils";
SwiperCore.use([Autoplay]);

const size = 50;

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
    <div className="bg-primary py-8">
      <div className="container">
        <H2 className={"text-center text-white"}>Why Choose Us</H2>
        <div className="mt-2">
          <Tabs defaultValue="buyer" className="w-full">
            <div className="mb-8 flex items-center justify-center">
              <TabsList className="mx-auto w-full text-center md:w-2/3 lg:w-1/4">
                <TabsTrigger value="buyer" className="w-full">
                  Buyer
                </TabsTrigger>
                <TabsTrigger value="seller" className="w-full">
                  Seller
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="buyer">
              <Cards data={data.buyer} />
            </TabsContent>
            <TabsContent value="seller">
              <Cards data={data.seller} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="relative z-10 -mb-20 mt-10">
          <Clientele />
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
          <div className="h-full w-full space-y-4 rounded-lg border border-primary bg-white p-8 text-black">
            <div className="flex size-14 items-center justify-end overflow-hidden rounded-md bg-primary text-white">
              <div
                className={cn("-mr-3", {
                  "scale-x-[-1]": key === 1 || key === 2,
                })}
              >
                {item.icon}
              </div>
            </div>
            <H3
              className={
                "relative before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-14 before:bg-primary"
              }
            >
              {item.title}
            </H3>
            <P>{item.content}</P>
          </div>
        </CardContainer>
      ))}
    </div>
  );
}

export function Clientele() {
  const breakpoints = {
    1200: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    550: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    500: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
  };

  return (
    <div>
      <H4 className={"text-white"}>1 Million+ SMEs & Corporates Served</H4>
      <div className="mt-2 rounded-lg bg-white shadow-md">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={breakpoints}
          className="py-2"
          autoplay={true}
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {[
            "/Ahulwalia_Contracts.png",
            "/Interarch_logo.png",
            "/KALPATPOWR.NS_logo.png",
            "/Kirby.png",
            "/L&T.png",
            "/Navayuga.png",
            "/NCRTC_LOGO.png",
            "/Shapoorji_Pallonji.png",
            "/Tata_Projects_Logo.png",
          ].map((item, key) => (
            <SwiperSlide key={key}>
              <div>
                <Image
                  width={100}
                  height={100}
                  src={item}
                  alt={item
                    .replace("/", "")
                    .replace(".png", "")
                    .replace(".", "")
                    .split("_")
                    .join(" ")}
                  style={{
                    background: "#fff",
                    width: "100%",
                    height: "auto",
                    backgroundPosition: "center",
                    objectFit: "contain",
                    borderRadius: "8px",
                    margin: "1rem",
                    padding: "10px",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
