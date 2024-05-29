"use client";
import Image from "next/image";
import Link from "next/link";
import { H1 } from "./ui/typography";
import { useFetchFeaturedSubCategories } from "@/hooks/useFetchFeaturedSubCat";
import SearchBox from "./Search";
import { FlipWords } from "./ui/flip-words";
import { ImagesSlider } from "./Image-slider";
import banner1 from "../../public/banner-1.jpg";
import banner2 from "../../public/banner-2.jpg";

export default function Hero() {
  const banners = [banner1, banner2];
  const { data: subCategories, isLoading: isSubCatLoading } =
    useFetchFeaturedSubCategories();
  const imageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

  return (
    <section
      style={{ height: "calc(100vh - 30vh)" }}
      // className="relative overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-black/60"
    >
      <div className="h-full">
        {/* <video src="./banner-video.mp4" autoPlay loop></video> */}
        <ImagesSlider images={banners}>
          <div className="relative z-50 flex flex-col items-center justify-center gap-3">
            <h1 className={"py-2 text-center text-4xl text-white"}>
              India&apos;s largest
              <br />{" "}
              <span className="text-4xl font-extrabold">
                B2B construction raw materials platform.
              </span>
              <br /> Extensive range of{" "}
              <span className="text-3xl font-semibold">
                <FlipWords
                  words={[
                    "Steel",
                    "PEB Products",
                    "Scaffolding",
                    "Wire Mesh",
                    "Binding Wire",
                    "Doors & Windows",
                    "Nails & Fasteners",
                  ]}
                />
              </span>
            </h1>
            <div className="space-x-2">
              {isSubCatLoading ? (
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, key) => (
                    <div
                      key={key}
                      className="h-6 w-20 animate-pulse rounded-full bg-gray-100/20"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-start gap-2">
                  {subCategories?.slice(0, 5).map((cat) => (
                    <Link
                      href={`/category/${cat.category_slug}/${cat.slug}`}
                      key={cat.id}
                      className="flex items-center gap-1 rounded-full border border-white/40 bg-white/30 p-1 pr-3 text-xs text-white backdrop-blur-sm transition-colors hover:bg-white hover:bg-white/40"
                    >
                      <Image
                        width={20}
                        height={20}
                        src={`${imageDomain}/${cat.image}`}
                        alt={cat.name}
                        className="rounded-full"
                      />
                      <span className="capitalize">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ImagesSlider>
      </div>

      <div className="-mt-8">
        <div className="mx-auto max-w-[700px] px-4">
          <SearchBox />
        </div>
      </div>
    </section>
  );
}
