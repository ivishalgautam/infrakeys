"use client";

import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SidebarSubCategoriesWithTypes({
  data,
  subCatSlug,
  catSlug,
}) {
  const [activeTabs, setActiveTabs] = useState([]);
  const group = Object.groupBy(data, ({ type }) => type);
  const types = Object.keys(group);
  const handleTabChange = (type) => {
    setActiveTabs(
      activeTabs.includes(type)
        ? activeTabs.filter((i) => i !== type)
        : [...activeTabs, type],
    );
  };

  useEffect(() => {
    setActiveTabs(types);
  }, [types?.length]);

  return (
    <div className="">
      <div className="space-y-2 p-2">
        {types?.map((type) => (
          <Collapsible
            open={activeTabs.includes(type)}
            onOpenChange={() => handleTabChange(type)}
            key={type}
            className={cn({
              "pb-2": activeTabs.includes(type),
            })}
          >
            <>
              <div className="flex items-center justify-between rounded-md bg-primary p-2 py-1 text-white">
                <h4 className="text-sm font-semibold">{type}</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-1 space-y-2 divide-y">
                {group[type].map((subCat) => (
                  <div
                    key={subCat.id}
                    className={cn(
                      "flex items-center justify-start gap-1 rounded-md px-2 py-2.5",
                      {
                        "bg-primary/10": subCat.slug === subCatSlug,
                      },
                    )}
                  >
                    <div
                      className={cn(
                        "size-3 rounded-full border-[3px] border-gray-400",
                        {
                          "border-primary": subCat.slug === subCatSlug,
                        },
                      )}
                    ></div>
                    <Link
                      href={`/category/${catSlug}/${subCat.slug}`}
                      className="text-sm"
                    >
                      {subCat.name}
                    </Link>
                  </div>
                ))}
              </CollapsibleContent>
            </>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
