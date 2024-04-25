import ImageSlider from "@/components/ImageSlider";
import ProductCard from "@/components/cards/product";
import AddToCart from "@/components/forms/add-to-cart";
import { Button } from "@/components/ui/button";
import { H3, P } from "@/components/ui/typography";
import { fetchProduct } from "@/utils/api";

export default async function Page({ params: { slug } }) {
  const { data } = await fetchProduct(slug);
  return (
    <section className="py-14">
      <div className="container space-y-10">
        <div className="rounded-md bg-white p-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="">
              <ImageSlider pictures={data?.pictures} />
            </div>
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
                  <span className="text-sm font-bold capitalize">SKU: </span>
                  <span className="text-sm">{data?.sku}</span>
                </div>
                <div>
                  <span className="text-sm font-bold capitalize">
                    Categories:{" "}
                  </span>
                  <span className="text-sm">{data?.category_name}</span>
                </div>
                <div>
                  <div>
                    <span className="text-sm font-bold capitalize">Tags: </span>
                    <span className="text-sm">{data?.tags.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* description */}
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

        {/* related products */}
        <div>
          <div className="border-b">
            <Button className="relative rounded-none bg-transparent p-0 pb-2 text-2xl font-semibold text-black before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-1/2 before:bg-primary hover:bg-transparent">
              Related products
            </Button>
          </div>
          {data?.related_products?.length ? (
            <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              {data?.related_products?.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <P>No related products.</P>
          )}
        </div>
      </div>
    </section>
  );
}
