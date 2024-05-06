"use client";
import { H2, P } from "./ui/typography";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "@/utils/endpoints";
import CategoryCard from "./cards/category";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";

export const fetchCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(
    `${baseUrl}${endpoints.categories.getAll}?featured=true`,
  );
  return data?.data;
};

export default function FeaturedCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-categories"],
    queryFn: fetchCategories,
  });

  const breakpoints = {
    1200: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    550: {
      slidesPerView: 3,
      spaceBetween: 12,
    },
    500: {
      slidesPerView: 2,
      spaceBetween: 12,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },
  };

  return (
    <div className="bg-gradient-to-b from-primary/10 to-transparent py-8">
      <div className="container space-y-4">
        <H2 className={"text-center"}>Featured categories</H2>
        <div className="mt-2">
          <Swiper
            // spaceBetween={50}
            slidesPerView={1}
            breakpoints={breakpoints}
            className="categories-slider"
            navigation
            modules={[Navigation]}
          >
            {isLoading
              ? [...new Array(8)].map((_, key) => (
                  <SwiperSlide key={key}>
                    <Skeleton />
                  </SwiperSlide>
                ))
              : data?.map(({ id, slug, name, image, sub_categories }) =>
                  [...Array(1)].map((_, key) => (
                    <SwiperSlide key={id} className="">
                      <CategoryCard
                        slug={slug}
                        name={name}
                        image={image}
                        subCategories={sub_categories}
                      />
                    </SwiperSlide>
                  )),
                )}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export function Skeleton() {
  return <div className="h-64 w-48 animate-pulse rounded-xl bg-black/10"></div>;
}
