"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LuBarChartHorizontal } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Spinner from "./Spinner";

export const fetchCategories = async () => {
  const { data } = await http().get(endpoints.categories.getAll);
  return data;
};

export default function BrowseCategory() {
  const pathname = usePathname();
  const [isCategory, setIsCategory] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: !!isCategory,
  });

  useEffect(() => {
    return () => {
      setIsCategory(false);
    };
  }, [pathname]);

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center gap-2 text-white"
        onClick={() => setIsCategory(!isCategory)}
      >
        <LuBarChartHorizontal size={25} />
        <span className="text-sm">Browse categories</span>
        <IoIosArrowDown size={25} className={isCategory && "rotate-180"} />
      </button>
      <div
        className={`absolute z-50 max-h-72 w-full overflow-y-scroll rounded bg-white p-4 ${isCategory ? "block" : "hidden"} mt-4 transition-all`}
      >
        <div className="space-y-2">
          {isLoading && <Spinner />}
          {data?.map((cat) => (
            <div key={cat.id}>
              <Link
                href={`/categories/${cat.slug}`}
                className="capitalize text-gray-700 transition-colors hover:text-primary"
              >
                {cat.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
