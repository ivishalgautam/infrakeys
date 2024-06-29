import { H2 } from "@/components/ui/typography";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-full p-4">
      <div className="container">
        <div className="">
          <H2 className={"m-0 text-center"}>Our Clientele</H2>
        </div>
        <div>
          <div className="mt-2 grid grid-cols-2 gap-4 rounded-lg sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
              "/clientele/adani.png",
              "/clientele/amns.png",
              "/clientele/bhel.png",
              "/clientele/dmrc.png",
              "/clientele/gmr.png",
              "/clientele/iocl.png",
              "/clientele/nbcc.png",
              "/clientele/nhai.png",
              "/clientele/ozone.jpeg",
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
                  className="aspect-video object-contain object-center mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
