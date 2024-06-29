"use client";

import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./cards/blog";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { H2 } from "./ui/typography";
import { Navigation } from "swiper/modules";

async function fetchBlogs() {
  return await http().get(`${endpoints.blogs.getAll}?featured=true`);
}

const breakpoints = {
  1200: {
    slidesPerView: 4,
    spaceBetween: 24,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  550: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  460: {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

export default function BlogsSlider() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchBlogs,
    queryKey: ["blogs"],
  });

  if (isLoading) return <Spinner />;
  if (!data?.length) return;

  return (
    <div className="container space-y-8 overflow-hidden p-8">
      <H2 className={"text-center"}>Our blogs</H2>

      <div className="">
        <Swiper
          // spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={breakpoints}
          navigation
          modules={[Navigation]}
          autoplay
          className="!overflow-visible"
        >
          {data?.map((blog) => (
            <SwiperSlide key={blog.id}>
              <BlogCard blog={blog} key={blog.id} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
