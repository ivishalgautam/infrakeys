"use client";
import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Skeleton } from "./ui/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import Link from "next/link";

// Sample news data
const newsCategories = [
  {
    id: "world",
    name: "World",
    articles: [
      {
        id: 1,
        title: "Global Summit Addresses Climate Change Initiatives",
        excerpt:
          "World leaders gather to discuss new policies aimed at reducing carbon emissions by 2030.",
        author: "Sarah Johnson",
        date: "2 hours ago",
        category: "Politics",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 2,
        title: "Economic Forum Predicts Growth in Emerging Markets",
        excerpt:
          "Analysts suggest significant economic expansion in Southeast Asian countries over next decade.",
        author: "Michael Chen",
        date: "4 hours ago",
        category: "Economy",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 3,
        title: "New Trade Agreement Signed Between EU and South America",
        excerpt:
          "Historic deal opens markets and reduces tariffs on thousands of products.",
        author: "Elena Rodriguez",
        date: "6 hours ago",
        category: "Trade",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: "business",
    name: "Business",
    articles: [
      {
        id: 4,
        title: "Tech Giant Announces Revolutionary AI Platform",
        excerpt:
          "New artificial intelligence system promises to transform how businesses analyze customer data.",
        author: "David Park",
        date: "1 hour ago",
        category: "Technology",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 5,
        title: "Startup Secures $50M in Series B Funding",
        excerpt:
          "Healthcare innovation company attracts major investment to expand telemedicine services.",
        author: "Jessica Wong",
        date: "3 hours ago",
        category: "Startups",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 6,
        title:
          "Market Report: Stocks Surge Following Federal Reserve Announcement",
        excerpt:
          "Investors respond positively to new interest rate policies, major indices reach record highs.",
        author: "Robert Miller",
        date: "5 hours ago",
        category: "Markets",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: "technology",
    name: "Technology",
    articles: [
      {
        id: 7,
        title: "Revolutionary Quantum Computing Breakthrough Announced",
        excerpt:
          "Scientists achieve stable qubit manipulation at room temperature, bringing quantum computing closer to practical use.",
        author: "Alan Turing",
        date: "30 minutes ago",
        category: "Computing",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 8,
        title: "New Smartphone Features Advanced Camera Technology",
        excerpt:
          "Latest flagship device incorporates computational photography techniques previously only available in professional cameras.",
        author: "Tina Chen",
        date: "2 hours ago",
        category: "Gadgets",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 9,
        title: "Electric Vehicle Startup Unveils Innovative Battery Design",
        excerpt:
          "New battery technology promises 500-mile range and 15-minute charging time for electric vehicles.",
        author: "Marcus Green",
        date: "4 hours ago",
        category: "Transportation",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: "health",
    name: "Health",
    articles: [
      {
        id: 10,
        title: "New Research Links Gut Microbiome to Improved Mental Health",
        excerpt:
          "Study finds strong correlation between specific gut bacteria and reduced anxiety and depression symptoms.",
        author: "Dr. Emily Chen",
        date: "1 hour ago",
        category: "Research",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 11,
        title: "Global Initiative Launches to Improve Vaccine Distribution",
        excerpt:
          "International health organizations partner to ensure equitable access to vaccines in developing nations.",
        author: "Dr. James Wilson",
        date: "3 hours ago",
        category: "Public Health",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 12,
        title:
          "Breakthrough in Alzheimer's Treatment Shows Promise in Clinical Trials",
        excerpt:
          "New drug demonstrates significant reduction in cognitive decline among early-stage patients.",
        author: "Dr. Maria Santos",
        date: "5 hours ago",
        category: "Medicine",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    articles: [
      {
        id: 13,
        title: "Award-Winning Director Announces New Film Project",
        excerpt:
          "Oscar-winning filmmaker partners with streaming service for ambitious historical drama series.",
        author: "Lisa Johnson",
        date: "2 hours ago",
        category: "Film",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 14,
        title: "Music Festival Announces Lineup for Summer Event",
        excerpt:
          "Popular annual festival reveals headliners and emerging artists for upcoming celebration.",
        author: "Jason Rodriguez",
        date: "4 hours ago",
        category: "Music",
        image: "/placeholder.svg?height=200&width=350",
      },
      {
        id: 15,
        title: "Streaming Platform's New Series Breaks Viewing Records",
        excerpt:
          "Mystery thriller becomes most-watched show in platform's history within first week of release.",
        author: "Emma Williams",
        date: "6 hours ago",
        category: "Television",
        image: "/placeholder.svg?height=200&width=350",
      },
    ],
  },
];

// Featured article
const featuredArticle = {
  id: 0,
  title: "Global Climate Summit Reaches Historic Agreement on Emissions",
  excerpt:
    "In a landmark decision, 195 countries have committed to aggressive carbon reduction targets that experts call 'the most significant climate action in decades.' The agreement includes unprecedented funding for renewable energy development in developing nations and establishes a new international body to monitor compliance.",
  author: "Jonathan Pierce",
  date: "1 hour ago",
  category: "Environment",
  image: "/placeholder.svg?height=400&width=800",
};
async function fetchNews(searchParams) {
  return await http().get(`${endpoints.news.getAll}?${searchParams}`);
}
export default function NewsWithTabs({}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const selectedCategory = searchParams.get("category");
  const {
    data: categories,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useQuery({
    queryFn: async () => {
      const { data } = await http().get(endpoints.news.categories);
      return data;
    },
    queryKey: ["news-categories"],
  });

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => fetchNews(searchParamsStr),
    queryKey: ["news", searchParamsStr],
  });

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-6">
        {/* News Categories Tabs */}
        <section>
          <Tabs defaultValue={selectedCategory ?? "all"} className="w-full">
            <div className="border-b">
              <TabsList className="">
                <TabsTrigger
                  value={"all"}
                  className="h-8 px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                  onClick={() =>
                    router.push(`?category=all`, {
                      scroll: false,
                    })
                  }
                >
                  All
                </TabsTrigger>
                {isCategoryLoading
                  ? Array.from({ length: 5 }).map((_, ind) => (
                      <Skeleton key={ind} className={"ml-2 h-10 w-32"} />
                    ))
                  : categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.slug}
                        className="px-4 py-2 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
                        onClick={() =>
                          router.push(`?category=${category.slug}`, {
                            scroll: false,
                          })
                        }
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
              </TabsList>
            </div>

            {isCategoryLoading || isLoading ? (
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card
                    key={index}
                    className="flex h-full flex-col overflow-hidden"
                  >
                    <Skeleton className="h-48 w-full" />
                    <CardHeader className="pb-2">
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent className="flex-grow pb-2">
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-0">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-8 w-16" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </div>
                </TabsContent>

                {categories.map((category) => (
                  <TabsContent
                    key={category.id}
                    value={category.slug}
                    className="mt-6"
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {data.map((article) => (
                        <NewsCard key={article.id} article={article} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </>
            )}
          </Tabs>
        </section>
      </main>
    </div>
  );
}

function NewsCard({ article }) {
  return (
    <Link href={`/news/${article.slug}`}>
      <Card className="flex h-full flex-col overflow-hidden">
        <div className="relative h-48">
          <Image
            width={350}
            height={200}
            src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${article.image}`}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <Badge className="absolute left-2 top-2">
            {article.category_name}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pb-2">
          <CardDescription>{article.short_description}</CardDescription>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-0">
          <div className="text-xs text-gray-500">
            By Admin • {moment(article.created_at).fromNow()}
          </div>
          <Button variant="ghost" size="sm">
            Read
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
