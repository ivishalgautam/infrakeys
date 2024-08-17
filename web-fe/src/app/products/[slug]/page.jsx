import AddToCart from "@/components/forms/add-to-cart";
import ProductTable from "@/components/table/product-table";
import { Button } from "@/components/ui/button";
import { H3, P } from "@/components/ui/typography";
import { fetchProduct } from "@/utils/api";

export async function generateMetadata({ params: { slug } }) {
  const { data } = await fetchProduct(slug);
  return {
    title: data?.meta_title ?? data?.title,
    description: data?.meta_description,
    keywords: data?.meta_keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${data?.slug}`,
    },
    openGraph: {
      title: data?.meta_title ?? data?.title,
      description: data?.meta_description,
      images: data?.image,
      type: "website",
    },
  };
}

export default async function Page({ params: { slug } }) {
  const { data } = await fetchProduct(slug);
  return (
    <section className="py-14">
      <div className="container space-y-10">
        <div className="rounded-md bg-white p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* description */}
            <div className="space-y-10 divide-y">
              <div className="space-y-4">
                <H3 className={"border-none font-bold"}>{data?.title}</H3>
                <div>
                  {Array.isArray(data?.custom_description) &&
                    data?.custom_description?.map((cd, ind) => (
                      <div key={ind}>
                        <span className="font-bold capitalize">{cd.key}</span>:{" "}
                        <span>{cd.value}</span>
                      </div>
                    ))}
                </div>
                <AddToCart id={data?.id} />
              </div>

              <div className="py-6">
                <div>
                  <span className="text-sm font-bold capitalize">
                    Categories:{" "}
                  </span>
                  {data?.categories?.map((category) => (
                    <span key={category.id} className="text-sm">
                      {category?.name},
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* description */}
        {data?.description ? (
          <div className="rounded-md bg-white p-8">
            <div className="border-b">
              <Button className="rounded-none border-b-2 border-primary bg-transparent p-0 pb-2 text-lg text-primary hover:bg-transparent">
                Description
              </Button>
            </div>
            <div
              className="py-6"
              dangerouslySetInnerHTML={{ __html: data?.description }}
            ></div>
          </div>
        ) : (
          <></>
        )}

        {/* related products */}
        <div className="space-y-2">
          <div className="border-b">
            <Button className="relative rounded-none bg-transparent p-0 pb-2 text-2xl font-semibold text-black before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-1/2 before:bg-primary hover:bg-transparent">
              Related products
            </Button>
          </div>
          {data?.related_products?.length ? (
            <div className="">
              <ProductTable products={data?.related_products} />
            </div>
          ) : (
            <P>No related products.</P>
          )}
        </div>
      </div>
    </section>
  );
}
