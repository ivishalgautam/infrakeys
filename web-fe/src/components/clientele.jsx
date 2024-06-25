import Image from "next/image";
import { H4 } from "./ui/typography";

export function Clientele() {
  return (
    <div className="bg-white p-4">
      <div className="container grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center">
          <H4 className={"m-0 text-primary"}>
            <span className="text-5xl font-bold text-black">1 Million+</span>{" "}
            <br /> SMEs & Corporates Served
          </H4>
          <p className={"mt-3 text-sm"}>
            We take pride in serving a diverse range of clients across various
            industries. Our commitment to excellence and personalized service
            has earned us the trust and loyalty of numerous prestigious
            organizations. Below is a selection of our esteemed clientele who
            have partnered with us to achieve their goals and drive success.
          </p>
        </div>
        <div>
          <div className="mt-2 grid grid-cols-2 gap-4 rounded-lg md:grid-cols-3">
            {[
              "/Ahulwalia_Contracts.png",
              "/Interarch_logo.png",
              "/KALPATPOWR.NS_logo.png",
              "/Kirby.png",
              "/L&T.png",
              "/Navayuga.png",
              "/NCRTC_LOGO.png",
              "/Shapoorji_Pallonji.png",
              "/Tata_Projects_Logo.png",
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
