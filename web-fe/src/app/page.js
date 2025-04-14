const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <Spinner />,
});
const FeaturedCategories = dynamic(
  () => import("@/components/featured-categories"),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);
const OurServices = dynamic(() => import("@/components/our-services"), {
  ssr: false,
  loading: () => <Spinner />,
});
const WhyChooseUs = dynamic(() => import("@/components/why-choose-us"), {
  ssr: false,
  loading: () => <Spinner />,
});
const TellUsRequirement = dynamic(
  () => import("@/components/tell-us-requirement"),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);
const BlogsSlider = dynamic(() => import("@/components/blogs-slider"), {
  ssr: false,
  loading: () => <Spinner />,
});
const Clientele = dynamic(
  () => import("@/components/clientele").then((data) => data.Clientele),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const ApplyForCredit = dynamic(() => import("@/components/apply-for-credit"), {
  ssr: false,
  loading: () => <Spinner />,
});
const OurPartners = dynamic(() => import("@/components/our-partners"), {
  ssr: false,
  loading: () => <Spinner />,
});
import NewsSection from "@/components/news-section";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";
const WhatsAppWidget = dynamic(() => import("@/components/whatsapp-chatbot"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function Home() {
  return (
    <div className="">
      <Hero />
      <FeaturedCategories />
      <OurServices />
      <NewsSection />
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
      <div className="fixed -right-12 top-2/3 z-50 -rotate-90 animate-blink transition-all">
        <ApplyForCredit />
      </div>
      <WhatsAppWidget />
    </div>
  );
}
