import Image from "next/image";
import React from "react";
import { H5, P } from "./ui/typography";

export default function CreditBenefits({ benefits }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {benefits.map(({ icon, title, content }) => (
        <div key={title} className="space-y-4 rounded-lg bg-white p-4">
          <figure>
            <Image
              className="mx-auto aspect-square"
              src={icon}
              width={200}
              height={200}
              alt={title}
            />
          </figure>
          <div>
            <H5 className={"m-0 text-center"}>{title}</H5>
            <P className={"!mt-2 text-center text-gray-500"}>{content}</P>
          </div>
        </div>
      ))}
    </div>
  );
}
