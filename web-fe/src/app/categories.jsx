"use client";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { H2 } from "@/components/ui/typography";
import CategoryCard from "@/components/cards/category";

export const fetchCategories = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(`${baseUrl}${endpoints.categories.getAll}`);
  return data?.data;
};

export default function Categories() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-categories"],
    queryFn: fetchCategories,
  });

  return (
    // <div className="bg-gradient-to-b from-primary/10 to-transparent py-8">
    <div className="py-8 pt-16">
      <div className="container space-y-4 overflow-hidden">
        <div className="mt-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {isLoading
              ? [...new Array(8)].map((_, key) => (
                  <SwiperSlide key={key}>
                    <Skeleton />
                  </SwiperSlide>
                ))
              : data?.map(({ id, slug, name, image, sub_categories }) =>
                  [...Array(1)].map((_, key) => (
                    <CategoryCard
                      key={key}
                      slug={slug}
                      name={name}
                      image={image}
                      subCategories={sub_categories.slice(0, 5)}
                    />
                  )),
                )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Skeleton() {
  return <div className="h-64 w-48 animate-pulse rounded-xl bg-black/10"></div>;
}
