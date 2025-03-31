import React from "react";
import { H2, P } from "./ui/typography";
import Image from "next/image";

export default function OurPartners() {
  return (
    <div className="bg-white py-8">
      <div className="container">
        <H2 className={"text-center"}>Our Partners</H2>
        <div>
          <P className={"text-center text-xs text-gray-400"}>
            Through strategic partnerships with leading industry players, we
            bring you comprehensive <br /> solutions for all your construction
            needs. Our network of partners includes
          </P>
        </div>

        <div className="mt-10 bg-white">
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              "/partners/jsw-neo.webp",
              "/partners/amns.webp",
              "/partners/jsw-steel.webp",
              "/partners/apollo.webp",
              "/partners/asian.webp",
              "/partners/kamdhenu.webp",
              "/partners/posco.webp",
              "/partners/prompt.webp",

              "/partners/electro.webp",
              "/partners/galant.webp",
              "/partners/goel.webp",
              "/partners/jindal-panther.webp",
              "/partners/rathi.webp",
              "/partners/sail.webp",
              "/partners/srb.webp",
              "/partners/surya.webp",
              "/partners/tata.webp",
              "/partners/vizag.webp",
            ].map((image, key) => (
              <figure key={key} className="rounded-lg bg-primary/5 p-8 py-4">
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt={image}
                  className="mx-auto aspect-video object-contain mix-blend-multiply"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
