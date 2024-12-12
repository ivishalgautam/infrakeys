// import Hero from "@/components/Hero";
// import FeaturedCategories from "@/components/featured-categories";
// import OurServices from "@/components/our-services";
// import WhyChooseUs from "@/components/why-choose-us";
// import TellUsRequirement from "@/components/tell-us-requirement";
// import BlogsSlider from "@/components/blogs-slider";
// import { Clientele } from "@/components/clientele";
// import ApplyForCredit from "@/components/apply-for-credit";
// import OurPartners from "@/components/our-partners";

const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => "loading...",
  ssr: false,
});
const FeaturedCategories = dynamic(
  () => import("@/components/featured-categories"),
  {
    loading: () => "loading...",
    ssr: false,
  },
);
const OurServices = dynamic(() => import("@/components/our-services"), {
  loading: () => "loading...",
  ssr: false,
});
const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), {
  loading: () => "loading...",
  ssr: false,
});
const TellUsRequirement = dynamic(
  () => import("@/components/tell-us-requirement"),
  {
    loading: () => "loading...",
    ssr: false,
  },
);
const BlogsSlider = dynamic(() => import("@/components/blogs-slider"), {
  loading: () => "loading...",
  ssr: false,
});
const Clientele = dynamic(
  () => import("@/components/clientele").then((data) => data.Clientele),
  {
    loading: () => "loading...",
    ssr: false,
  },
);

const ApplyForCredit = dynamic(() => import("@/components/apply-for-credit"), {
  loading: () => "loading...",
  ssr: false,
});
const OurPartners = dynamic(() => import("@/components/our-partners"), {
  loading: () => "loading...",
  ssr: false,
});
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedCategories />
      <OurServices />
      <BlogsSlider />
      <WhyChooseUs />
      <Clientele />
      <div className="bg-white pt-10">
        <OurPartners />
      </div>
      <div className="bg-white py-8 pt-28">
        <div className="container">
          <TellUsRequirement type={"horizontal"} />
        </div>
      </div>
      <div className="fixed -right-12 top-2/3 z-50 -rotate-90">
        <ApplyForCredit />
      </div>
      {/* <InteraktChatbot /> */}
    </div>
  );
}
