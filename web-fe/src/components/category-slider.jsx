"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function CategorySlider({ banners, categoryName }) {
  const domain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

  return (
    <Swiper slidesPerView={1}>
      {banners?.map((banner, key) => (
        <SwiperSlide key={key}>
          <Image
            alt={`${categoryName}-banner-${key + 1}`}
            src={`${domain}/${banner}`}
            width={1000}
            height={1000}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
