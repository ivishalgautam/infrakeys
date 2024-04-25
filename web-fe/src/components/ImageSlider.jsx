"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ImageSlider({ pictures }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className="space-y-2">
      <div className="rounded-md border border-black">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {pictures?.map((picture, key) => (
            <SwiperSlide key={picture}>
              <div className="p-8">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${picture}`}
                  alt={`image-${key}`}
                  width={1000}
                  height={1000}
                  className="rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="p-1">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper1"
        >
          {pictures?.map((picture, key) => (
            <SwiperSlide key={picture}>
              <div className="relative rounded-md border border-black p-4">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${picture}`}
                  alt={`image-${key}`}
                  width={50}
                  height={50}
                  className="rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>{" "}
    </div>
  );
}
