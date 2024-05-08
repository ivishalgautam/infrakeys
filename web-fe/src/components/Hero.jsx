"use client";
import Image from "next/image";
import Link from "next/link";
import { H1 } from "./ui/typography";
import { useFetchFeaturedSubCategories } from "@/hooks/useFetchFeaturedSubCat";
import SearchBox from "./Search";

export default function Hero() {
  const { data: subCategories, isLoading: isSubCatLoading } =
    useFetchFeaturedSubCategories();
  const imageDomain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

  return (
    <section
      style={{ height: "calc(100vh - 30vh)" }}
      className="relative overflow-hidden before:absolute before:inset-0 before:z-10 before:bg-black/60"
    >
      <div className="absolute bottom-0">
        <video src="./banner-video.mp4" autoPlay loop></video>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-start p-4 lg:p-24">
        <div className="grid grid-cols-12">
          <div className="col-span-12 space-y-4 sm:col-span-10 md:col-span-8 lg:col-span-6">
            <H1 className={"text-white lg:text-4xl"}>
              India&apos;s Largest B2B Raw Materials Procurement & Credit
              Platform
            </H1>
            <div>
              <SearchBox />
            </div>
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
                      className="flex items-center gap-1 rounded-full border border-white/40 bg-white/90 p-1 pr-3 text-xs text-gray-500 backdrop-blur-sm transition-colors hover:bg-white"
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
        </div>
      </div>
    </section>
  );
}
