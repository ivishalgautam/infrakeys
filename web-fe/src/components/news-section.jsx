"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Spinner from "./Spinner";
import { H2 } from "./ui/typography";

// Sample news data
const newsArticles = [
  {
    id: "6be72670-b6dc-4045-a896-80d7d80c72fd",
    title:
      "India: Odisha iron ore fines index remain firm after miners float fresh offers",
    image: "/placeholder.svg?height=400&width=600",
    slug: "india-odisha-iron-ore-fines-index-remain-firm-after-miners-float-fresh-offers",
    short_description:
      "Iron ore prices in Odisha remained steady this week after major merchant miners released their fresh offers for FY'26 after receiving news ECs. The new offers were marginally higher than the previous closing, supported by sustained demand in the market.",
    created_at: "2025-04-14T07:29:21.827Z",
    updated_at: "2025-04-14T07:29:21.827Z",
    category_name: "Iron ore",
  },
  {
    id: "9730a4be-c88c-49e3-bc81-afae2f2ad257",
    title: "Two Coal Mines Awarded in Latest Coal Ministry Auction",
    image: "/placeholder.svg?height=400&width=600",
    slug: "two-coal-mines-awarded-in-latest-coal-ministry-auction",
    short_description:
      "After 11 rounds of coal mining auctions, two enterprises—Singhal Business Pvt Ltd. and PRA Nuravi Coal Mining Pvt Ltd.— have emerged as the successful bidders of two coal mines and are now partnering with the Ministry of Coal on several Coal Mine Development and Production Agreements (CMDPAs).",
    created_at: "2025-04-14T07:26:54.388Z",
    updated_at: "2025-04-14T07:50:48.003Z",
    category_name: "Coal",
  },
  {
    id: "10758c7c-e524-47bf-b32b-76da80421a3f",
    title:
      "Vedanta, Hindustan Zinc, Coal India among top 5 large-cap dividend yield stocks during last one year",
    image: "/placeholder.svg?height=400&width=600",
    slug: "vedanta-hindustan-zinc-coal-india-among-top-5-large-cap-dividend-yield-stocks-during-last-one-year",
    short_description:
      "Dividend Stocks: Discover the top five large-cap stocks with remarkable dividend yields over the past year. Vedanta Ltd tops the list with a stunning 12% yield, followed by Hindustan Zinc and Coal India",
    created_at: "2025-04-14T07:20:59.986Z",
    updated_at: "2025-04-14T07:20:59.986Z",
    category_name: "Coal",
  },
  {
    id: "aaef7640-f37e-45d2-b929-9ab191bdd25d",
    title:
      "Tata Steel share price soars 6% after Dutch subsidiary unveils transformation plan",
    image: "/placeholder.svg?height=400&width=600",
    slug: "tata-steel-share-price-soars-6percent-after-dutch-subsidiary-unveils-transformation-plan",
    short_description:
      "Tata Steel share price rose 6% after its Dutch subsidiary announced a transformation plan aimed at enhancing competitiveness and transitioning to green steel, which includes cutting approximately 1,600 jobs.",
    created_at: "2025-04-14T07:12:30.975Z",
    updated_at: "2025-04-14T07:12:30.975Z",
    category_name: "Steel",
  },
  {
    id: "648c9bed-3a26-4900-950c-c8748fa6a06e",
    title:
      "Explained: Why UK is rushing to save its last steel plant and what Trump, China and India's Tata Steel have to do with it?",
    image: "/placeholder.svg?height=400&width=600",
    slug: "explained-why-uk-is-rushing-to-save-its-last-steel-plant-and-what-trump-china",
    short_description:
      "The legislation would give Business Secretary Jonathan Reynolds the authority to keep the vital steelworks operating while the government searches for a partner to help invest in the site.",
    created_at: "2025-04-14T06:42:49.140Z",
    updated_at: "2025-04-14T07:47:14.165Z",
    category_name: "Steel",
  },
];

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function NewsSection({}) {
  const {
    data: newsArticles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: async () => {
      return await http().get(`${endpoints.news.getAll}`);
    },
    queryKey: ["news"],
  });

  if (isLoading) return <Spinner />;
  if (isError) return error?.message ?? "Error";

  // Featured article is the newest one
  const featuredArticle = newsArticles[0];
  const remainingArticles = newsArticles.slice(1, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto space-y-6 px-4 py-8">
        <H2 className={"text-center"}>Top News</H2>

        {/* Featured Article */}
        <section className="mb-12">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="md:flex">
              <div className="relative h-64 md:h-auto md:w-1/2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${featuredArticle.image}`}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute left-4 top-4 bg-orange-500 hover:bg-orange-600">
                  {featuredArticle.category_name}
                </Badge>
              </div>
              <div className="flex flex-col justify-between p-6 md:w-1/2 md:p-8">
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">
                    {featuredArticle.title}
                  </h3>
                  <p className="mb-4 text-gray-600">
                    {featuredArticle.short_description}
                  </p>
                </div>
                <div>
                  <div className="mb-4 flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{formatDate(featuredArticle.created_at)}</span>
                  </div>
                  <Link href={`/news/${featuredArticle.slug}`}>
                    <Button className="w-full md:w-auto">
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs for Categories */}
        <section className="mb-12 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {remainingArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href={"/news"}
              className={buttonVariants({ variant: "primary" })}
            >
              View All
            </Link>
          </div>
        </section>

        {/* Alternative Layout - List View */}
        {/* <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Latest Updates
            </h2>
            <Button variant="outline">View All</Button>
          </div>

          <div className="space-y-6">
            {sortedArticles.map((article) => (
              <div
                key={article.id}
                className="flex gap-4 rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Badge className="mb-2">{article.category_name}</Badge>
                  <h3 className="mb-1 font-semibold text-gray-900">
                    {article.title}
                  </h3>
                  <div className="mb-2 flex items-center text-xs text-gray-500">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-sm font-medium text-orange-600 hover:text-orange-700"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section> */}
      </main>
    </div>
  );
}

// Article Card Component
function ArticleCard({ article }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-48">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${article.image}`}
          alt={article.title}
          fill
          className="object-cover"
        />
        <Badge className="absolute left-3 top-3 bg-orange-500 hover:bg-orange-600">
          {article.category_name}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <h3 className="line-clamp-2 text-lg font-bold">{article.title}</h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 text-sm text-gray-600">
          {article.short_description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="mr-1 h-3 w-3" />
          <span>{formatDate(article.created_at)}</span>
        </div>
        <Link href={`/news/${article.slug}`}>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 text-orange-600 hover:text-orange-700"
          >
            Read more
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
