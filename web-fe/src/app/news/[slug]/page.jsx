import FAQAccordion from "@/components/faq-accordion";
import { H1, H4, H5, H6, P } from "@/components/ui/typography";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import { Clock, ExternalLink } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params: { slug } }) {
  const data = await getNews(slug);
  return {
    title: data?.meta_title ? data?.meta_title : data?.title,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/news/${data?.slug}`,
    },
    openGraph: {
      title: data?.meta_title ?? data?.title,
      description: data?.meta_description,
      images: data?.image,
      type: "website",
    },
  };
}

const getNews = async (slug) => {
  const { data } = await axios.get(
    `${baseUrl}${endpoints.news.getAll}/getBySlug/${slug}`,
  );
  return data;
};
const getRelatedNews = async (id) => {
  if (!id) return;
  const { data } = await axios.get(
    `${baseUrl}${endpoints.news.getAll}/getRelatedNews/${id}`,
  );

  return data;
};

export default async function Page({ params: { slug } }) {
  const news = await getNews(slug);
  const relatedNews = await getRelatedNews(news?.id);

  return (
    <div className="container p-4">
      <div className="mx-auto space-y-4">
        {/* image */}
        <div className="">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${news?.image}`}
            width={1000}
            height={1000}
            quality={100}
            alt={news?.title}
            className="h-[30rem] w-full rounded-md object-cover object-center"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-4 space-y-4 rounded-lg bg-white p-8 lg:col-span-3">
            {/* date */}
            <div className="flex items-center justify-start gap-1 text-xs font-medium text-gray-400">
              <Clock size={18} /> {moment(news.created_at).format("DD MMM, Y")}
            </div>

            {/* title */}
            <H1 className={"m-0 !text-3xl"}>{news?.title}</H1>

            {/* blog content */}
            <div className="w-full">
              <div
                className="prose prose-slate prose-orange w-full rounded-lg lg:prose-lg prose-h1:mb-0 prose-h1:mt-5 prose-h2:mb-0 prose-h2:mt-5 prose-h3:mb-0 prose-h3:mt-5  prose-h4:mb-0 prose-h4:mt-5 prose-h5:mb-0 prose-h5:mt-5 prose-h6:mb-0 prose-h6:mt-5 prose-p:m-0 prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: news?.content }}
              />
              <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded border p-4 py-4 sm:flex-row sm:items-center">
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">
                    Originally published on{" "}
                    <span className="font-medium">{news?.poster_name}</span>
                  </p>
                </div>
                <a
                  href={news?.poster_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex cursor-pointer items-center text-sm font-medium text-primary hover:underline"
                >
                  View original article
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-span-4 lg:col-span-1">
            <div className="h-auto rounded-lg bg-white p-8">
              <H5>Related news</H5>
              <div className="mt-2 space-y-2">
                {!relatedNews?.length && (
                  <P className={"text-xs"}>No related news</P>
                )}
                {relatedNews?.map((nw) => (
                  <div key={nw.id} className="group">
                    <Link
                      href={`/news/${nw.slug}`}
                      className="flex items-start justify-start gap-4"
                    >
                      <div>
                        <figure className="h-16 w-16">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${nw.image}`}
                            width={100}
                            height={100}
                            alt={nw.title}
                            className="h-full w-full rounded-md object-cover object-center"
                          />
                        </figure>
                      </div>

                      <div className="">
                        <div>
                          <H6
                            className={
                              "line-clamp-1 text-ellipsis text-sm transition-colors group-hover:text-primary"
                            }
                          >
                            {nw.title}
                          </H6>
                          <p
                            className={
                              "m-0 line-clamp-1 text-ellipsis text-xs text-gray-500"
                            }
                          >
                            {nw.short_description}
                          </p>
                        </div>

                        <div className="mt-2 flex items-center justify-start gap-1 text-[10px] font-medium text-gray-400">
                          <Clock size={15} />{" "}
                          {moment(nw.created_at).format("DD MMM, Y")}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
