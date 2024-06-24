import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/featured-products";
import FeaturedCategories from "@/components/featured-categories";
import OurServices from "@/components/our-services";
import WhyChooseUs from "@/components/why-choose-us";
import QueryForm from "@/components/forms/query";
import TellUsRequirement from "@/components/tell-us-requirement";
import BlogsSlider from "@/components/blogs-slider";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedCategories />
      <OurServices />
      <BlogsSlider />
      <WhyChooseUs />
      <div className="bg-white py-8 pt-28">
        <div className="container">
          <TellUsRequirement type={"horizontal"} />
        </div>
      </div>
    </div>
  );
}
