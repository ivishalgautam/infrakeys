"use client";

import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./cards/blog";
import Spinner from "./Spinner";

async function fetchBlogs() {
  return await http().get(endpoints.blogs.getAll);
}

export default function Blogs() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: fetchBlogs,
    queryKey: ["blogs"],
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((blog) => (
          <BlogCard blog={blog} key={blog.id} />
        ))}
      </div>
    </div>
  );
}
