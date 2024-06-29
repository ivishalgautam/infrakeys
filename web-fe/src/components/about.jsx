"use client";
import { useRouter } from "next/navigation";
import { H1, P } from "./ui/typography";
import { Clientele } from "./clientele";
import OurPartners from "./our-partners";

export default function About() {
  return (
    <div className="bg-white py-8">
      <div className="container space-y-16">
        <div>
          <H1 className={"text-center"}>About us</H1>

          <P className={"text-center"}>
            Infrakeys Technologies is India&apos;s largest steel supplier,
            serving clients nationwide. What sets us apart is our commitment to
            providing you direct access to trusted vendors. This direct
            connection ensures competitive prices, enabling you to optimize your
            budget while maintaining the highest quality standards. We
            understand the importance of financial flexibility in your projects,
            that&apos;s why Infrakeys offers channel financing options to make
            your procurement process even smoother. With a wide range of steel
            products and a strong network of suppliers, we ensure timely
            delivery and excellent service, making us the preferred choice for
            all your steel needs.
          </P>
        </div>

        <div>
          <Clientele />
        </div>
        <div>
          <OurPartners />
        </div>
      </div>
    </div>
  );
}
