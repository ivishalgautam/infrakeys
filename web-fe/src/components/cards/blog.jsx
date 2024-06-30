import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { H6 } from "../ui/typography";
import moment from "moment";

export default function BlogCard({ blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="group overflow-hidden rounded-lg bg-white shadow">
        <div>
          <figure>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${blog.image}`}
              width={300}
              height={300}
              alt={blog.title}
              className="aspect-video"
            />
          </figure>
        </div>

        <div className="space-y-4 p-3">
          {/* date */}
          <div className="my-1 mb-3 flex items-center justify-start gap-1 text-xs font-medium text-gray-400">
            <Clock size={18} /> {moment(blog.created_at).format("DD MMM, Y")}
          </div>

          {/* categories */}
          <div className="flex flex-wrap items-center justify-start gap-1">
            {blog.categories.map((cat) => (
              <Link
                href={`/category/${cat.slug}`}
                className="rounded-full bg-gray-200 p-1 px-2 text-xs font-semibold capitalize text-black/50 transition-colors hover:bg-primary hover:text-white"
                key={cat.id}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* title and short desc */}
          <div className="space-y-1">
            <H6
              className={
                "line-clamp-2 h-[40px] leading-5 md:line-clamp-1 md:h-auto lg:line-clamp-2 lg:h-[40px]"
              }
            >
              {blog.title}
            </H6>
            <p className="line-clamp-3 h-[48px] text-ellipsis text-xs text-gray-400">
              {blog.short_description}
            </p>
          </div>

          {/* read more */}
          <div className="mt-auto">
            <div className="flex items-center justify-end gap-2 pr-3 text-xs font-semibold">
              <div className="inline-block text-[11px] font-semibold uppercase text-gray-400">
                Read more
              </div>
              <span className="rounded-full bg-primary p-0.5 text-white transition-transform group-hover:translate-x-1">
                <ChevronRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
