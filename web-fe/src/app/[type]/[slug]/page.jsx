import PaginationControls from "@/components/PaginationControls";
import AllProducts from "@/components/all-products";
import ProductCard from "@/components/cards/product";
import SidebarBrands from "@/components/layout/sidebar-brands";
import SidebarCategories from "@/components/layout/sidebar-categories";
import { P } from "@/components/ui/typography";
import { fetchProducts } from "@/utils/api";

export default async function Page({
  params: { type, slug },
  searchParams: { page: currPage, limit },
}) {
  const { data, total_page, page } = await fetchProducts(
    type,
    slug,
    currPage ? currPage : 1,
    limit,
  );
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="space-y-4">
              <SidebarCategories />
              <SidebarBrands />
            </div>
          </div>

          <div className="relative col-span-12 md:col-span-8 lg:col-span-9">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {data?.length ? (
                data?.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))
              ) : (
                <P>No products found!</P>
              )}
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              <PaginationControls total_page={total_page} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
