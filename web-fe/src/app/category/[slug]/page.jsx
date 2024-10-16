import CategorySlider from "@/components/category-slider";
import FAQAccordion from "@/components/faq-accordion";
import ProductTable from "@/components/table/product-table";
import ProductTableWithFilter from "@/components/table/product-table-with-filter";
import TellUsRequirement from "@/components/tell-us-requirement";
import { buttonVariants } from "@/components/ui/button";
import { H2, H4 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { endpoints } from "@/utils/endpoints";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// base api url
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function generateMetadata({ params: { slug } }) {
  const { data } = await fetchCategory(slug);
  return {
    title: data?.meta_title ?? data?.name,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/category/${data?.slug ?? slug}`,
    },
    openGraph: {
      images: data?.image,
      title: data?.meta_title ?? data?.name,
      description: data?.meta_description,
    },
  };
}

async function fetchCategory(slug) {
  const response = await axios.get(
    `${baseUrl}${endpoints.categories.getAll}/${slug}`,
  );
  return response.data;
}
async function fetchVariants(slug) {
  const response = await axios.get(
    `${baseUrl}${endpoints.categories.getAll}/getVariantsBySlug/${slug}`,
  );
  return response.data;
}
async function fetchProducts(slug) {
  const response = await axios.get(
    `${baseUrl}${endpoints.products.getAll}/getByCategory/${slug}`,
  );
  return response.data;
}

export default async function CategoryPage({ params: { slug } }) {
  const { data: category } = await fetchCategory(slug);
  const { data: variants } = await fetchVariants(
    category.is_variant ? category.main_slug : slug,
  );
  const { data: products } = await fetchProducts(
    category.is_variant ? category.main_slug : slug,
  );
  const filteredVariants =
    variants?.filter((variant) => variant.slug !== slug) ?? [];

  return (
    <section>
      <div className="container space-y-8 py-8">
        {/* sub categories and banners*/}
        <div>
          <H2 className="capitalize">{`${category?.name}`}</H2>
          <div className="grid grid-cols-12 gap-4">
            {/* top sub categories */}
            <div className="col-span-12 rounded-lg bg-white p-6 sm:col-span-5 md:col-span-4 lg:col-span-3 ">
              <H4>Top Categories</H4>
              <div className="mt-2 max-h-72 space-y-2 overflow-y-scroll">
                {category?.top_sub_categories?.length &&
                category?.top_sub_categories?.[0] === null
                  ? "No sub categories found!"
                  : category?.top_sub_categories?.map(
                      ({ id, name, image, slug: subCatSlug }) => (
                        <CategoryCell
                          {...{ name, image, subCatSlug, catSlug: slug }}
                          key={id}
                        />
                      ),
                    )}
              </div>
            </div>

            {/* banners */}
            <div className="col-span-12 overflow-hidden rounded-lg sm:col-span-7 md:col-span-8 lg:col-span-9">
              <div className="max-h-[375px]">
                <CategorySlider
                  banners={category?.banners}
                  categoryName={category?.name}
                />
              </div>
            </div>
          </div>
        </div>

        {filteredVariants.length > 0 && (
          <div className="space-y-2 rounded-lg bg-white p-8">
            <H4>We serve in:</H4>
            <div className="flex items-center justify-start gap-4">
              {filteredVariants?.map((variant) => (
                <Link
                  key={variant.id}
                  href={`/category/${variant.slug}`}
                  className={cn(
                    "capitalize",
                    buttonVariants({ variant: "outline" }),
                  )}
                >
                  {variant?.name?.split(" in ")[1]}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* products */}
        <div className="space-y-4 rounded-lg bg-white p-8">
          <div>
            <H4>Products</H4>
          </div>
          <div>
            <ProductTableWithFilter products={products} />
          </div>
        </div>

        {/* form */}
        <div>
          <TellUsRequirement type={"horizontal"} />
        </div>

        {/* faq */}
        <div className="rounded-lg bg-white p-8">
          <H4>{category?.name} FAQs</H4>

          <div>
            <FAQAccordion faq={category?.faq} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CategoryCell({ name, image, subCatSlug, catSlug }) {
  const domain = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

  return (
    <div className="group rounded-md bg-gray-100 p-1">
      <Link href={`/category/${catSlug}/${subCatSlug}`}>
        <div className="flex items-center justify-start gap-2">
          <figure className="relative size-10">
            <Image
              src={`${domain}/${image}`}
              alt={name}
              fill
              className="rounded-full object-cover object-center"
            />
          </figure>
          <div className="mr-auto text-sm font-medium capitalize">{name}</div>
          <div className="-translate-x-3 transition-transform group-hover:-translate-x-2">
            <ArrowRight />
          </div>
        </div>
      </Link>
    </div>
  );
}
