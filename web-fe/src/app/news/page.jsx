import NewsWithTabs from "@/components/news-with-tabs";
import Spinner from "@/components/Spinner";
import { H1 } from "@/components/ui/typography";
import { Suspense } from "react";

export const metadata = {
  title: "Blogs | Infrakeys",
  description: "Infrakeys Blogs",
  openGraph: {
    title: "Infrakeys Blogs",
    description: "Infrakeys Blogs",
  },
  alternates: {
    canonical: `/news`,
  },
};

export default function Page({ searchParams: { category } }) {
  return (
    <div className="container py-4">
      <H1 className={"my-8 text-center"}>Our news</H1>
      <Suspense fallback={<Spinner />}>
        <NewsWithTabs category={category} />
      </Suspense>
    </div>
  );
}
