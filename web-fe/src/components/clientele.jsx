import Image from "next/image";
import { H2 } from "./ui/typography";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

export function Clientele() {
  return (
    <div className="bg-white p-4">
      <div className="container grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center">
          <H2 className={"m-0"}>
            {/* <span className="text-5xl font-bold text-black">1 Million+</span>{" "}
            <br /> SMEs & Corporates Served */}
            Our Clientele
          </H2>
          <p className={"mt-3 text-sm text-gray-500"}>
            Our dedication to quality, efficiency, and client satisfaction sets
            us apart as the preferred choice for all construction needs. Explore
            our portfolio to discover more about our successful partnerships and
            impactful projects.
          </p>

          <Link
            href={"/clientele"}
            type="button"
            className={`${buttonVariants({ variant: "primary" })} mt-6`}
          >
            View more
          </Link>
        </div>
        <div>
          <div className="mt-2 grid grid-cols-2 gap-4 rounded-lg md:grid-cols-3">
            {[
              "/clientele/Ahulwalia_Contracts.png",
              "/clientele/Interarch_logo.png",
              "/clientele/KALPATPOWR.NS_logo.png",
              "/clientele/Kirby.png",
              "/clientele/L&T.png",
              "/clientele/Navayuga.png",
              "/clientele/NCRTC_LOGO.png",
              "/clientele/Shapoorji_Pallonji.png",
              "/clientele/Tata_Projects_Logo.png",
            ].map((item, key) => (
              <div key={key} className="rounded-2xl bg-gray-50 p-4">
                <Image
                  width={1000}
                  height={1000}
                  src={item}
                  alt={item
                    .replace("/", "")
                    .replace(".png", "")
                    .replace(".", "")
                    .split("_")
                    .join(" ")}
                  className="mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
