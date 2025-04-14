"use client";

import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./cards/blog";
import Spinner from "./Spinner";
import NewsCard from "./cards/news";

async function fetchNews() {
  return await http().get(`${endpoints.news.getAll}`);
}

export default function News() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchNews,
    queryKey: ["news"],
  });
  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((news) => (
          <NewsCard news={news} key={news.id} />
        ))}
      </div>
    </div>
  );
}
