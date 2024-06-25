import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/featured-categories";
import OurServices from "@/components/our-services";
import WhyChooseUs from "@/components/why-choose-us";
import TellUsRequirement from "@/components/tell-us-requirement";
import BlogsSlider from "@/components/blogs-slider";
import { Clientele } from "@/components/clientele";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedCategories />
      <OurServices />
      <BlogsSlider />
      <WhyChooseUs />
      <Clientele />
      <div className="bg-white py-8 pt-28">
        <div className="container">
          <TellUsRequirement type={"horizontal"} />
        </div>
      </div>
    </div>
  );
}
