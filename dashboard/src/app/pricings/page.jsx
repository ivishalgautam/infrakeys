import { Suspense } from "react";
import { searchParamsCache, serialize } from "@/lib/searchparams";
import TableActions from "./_component/table-actions";
import Listing from "./_component/listing";
import Link from "next/link";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/datatable/data-table-skeleton";
import Title from "@/components/Title";

export const metadata = {
  title: "Pricing",
};

export default async function Pricings({ searchParams }) {
  searchParamsCache.parse(searchParams);
  const key = serialize({ ...searchParams });

  return (
    <div className="container mx-auto bg-white p-8 rounded-lg border-input">
      <div className="flex items-start justify-between">
        <Title text={"Pricing"} />

        <Link
          href={"/pricings/create"}
          className={cn(buttonVariants({ variant: "outline" }), "h-7")}
        >
          <Plus /> Add
        </Link>
      </div>
      <TableActions />
      <Suspense
        key={key}
        fallback={<DataTableSkeleton columnCount={4} rowCount={10} />}
      >
        <Listing />
      </Suspense>
    </div>
  );
}
