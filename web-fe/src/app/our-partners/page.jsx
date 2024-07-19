import React from "react";
import Image from "next/image";
import { H1 } from "@/components/ui/typography";

export const metadata = {
  title: "Partners | Infrakeys",
  description: "Infrakeys Partners",
  openGraph: {
    title: "Infrakeys Partners",
    description: "Infrakeys Partners",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/our-partners`,
  },
};

export default function Page() {
  return (
    <div className="h-full py-8">
      <div className="container">
        <H1 className={"my-8 text-center"}>Our Partners</H1>

        <div className="mt-10">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              "/partners/amns.png",
              "/partners/apollo.png",
              "/partners/asian.png",
              "/partners/electro.png",
              "/partners/galant.png",
              "/partners/goel.png",
              "/partners/jindal-panther.jpg",
              "/partners/jsw-neo.jpeg",
              "/partners/jsw-steel.png",
              "/partners/kamdhenu.png",
              "/partners/posco.png",
              "/partners/prompt.png",
              "/partners/rathi.png",
              "/partners/sail.png",
              "/partners/srb.png",
              "/partners/surya.jpg",
              "/partners/tata.png",
              "/partners/vizag.png",
            ].map((image, key) => (
              <figure key={key} className="rounded-lg bg-primary/5 p-8 py-4">
                <Image
                  src={image}
                  width={500}
                  height={500}
                  alt={image}
                  className="aspect-video object-contain mix-blend-multiply"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
