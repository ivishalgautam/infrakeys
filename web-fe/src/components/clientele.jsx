import Image from "next/image";
import { H4 } from "./ui/typography";

export function Clientele() {
  return (
    <div className="bg-white p-4">
      <div className="container grid gap-4  lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center">
          <H4 className={"m-0 text-primary"}>
            <span className="text-5xl font-bold text-black">1 Million+</span>{" "}
            <br /> SMEs & Corporates Served
          </H4>
          <p className={"mt-3 text-sm"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
            totam harum, dolore consequatur porro nesciunt labore inventore
            distinctio, nobis optio, ratione nihil deserunt. Sequi minima eos
            ipsum voluptatem voluptates velit beatae nobis commodi placeat.e
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
