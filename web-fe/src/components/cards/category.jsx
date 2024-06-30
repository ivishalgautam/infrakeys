import Image from "next/image";
import Link from "next/link";
import { H3, H4 } from "../ui/typography";
import { MoveRight } from "lucide-react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import React from "react";

export default function CategoryCard({ slug, image, name, subCategories }) {
  return (
    <CardContainer className={"w-full"}>
      <Link href={`/category/${slug}`} className="w-full ">
        <div className="flex min-h-[330px] flex-col justify-between rounded-xl border border-primary bg-white p-4 shadow-lg">
          <div>
            <H4 className={"mb-1 text-center text-lg leading-5 tracking-wide"}>
              {name}
            </H4>
            <div className="text-center leading-3">
              {subCategories?.length === 1 && subCategories[0] === null
                ? ""
                : subCategories?.map((subCat, key) => (
                    <React.Fragment key={key}>
                      <span
                        key={subCat.id}
                        className="text-xs capitalize text-gray-500 transition-colors hover:text-primary"
                      >
                        {subCat.name}
                      </span>
                      <span className="mr-1 text-xs text-gray-500">
                        {subCategories?.length - 1 !== key ? "," : " and more"}
                      </span>
                    </React.Fragment>
                  ))}
            </div>
          </div>

          <div>
            <figure className="relative h-32 w-full">
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${image}`}
                alt={name}
                className="aspect-video rounded object-contain bg-blend-screen transition-transform"
              />
            </figure>
          </div>

          <div className="group mt-3 flex items-center justify-start gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold uppercase text-white transition-all md:gap-4">
            <span>View all </span>
            <div className="transition-transform group-hover:translate-x-3">
              <MoveRight />
            </div>
          </div>
        </div>
      </Link>
    </CardContainer>
  );
}
