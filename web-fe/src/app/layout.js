import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/components/QueryClientProvider";
import { Toaster } from "sonner";
import Context from "@/store/context";
import Layout from "@/components/layout";
import { GoogleTagManager } from "@next/third-parties/google";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Script from "next/script";

export const metadata = {
  title: {
    default:
      "InfraKeys: Stainless Steel l Wire Mesh & Scaffolding Manufacturer in India",
    // template: "%s | Infrakeys",
  },
  description:
    "Infrakeys, the best steel manufacturers in India, offered a wide range of steel, wire mesh & binding wire, scaffolding, doors & windows, nails & industrial products at reasonable prices.",
  keywords:
    "Steel Manufacturers in india, steel fabricators near me,industrial steel in faridabad, Steel supplier in India, scaffolding manufacturer in faridabad, TMT suppliers in faridabad, PEB manufacturers in India, PEB manufacturers, steel supplier in faridabad, steel manufacturers,india, industrial steel in india, scaffolding manufacturer in India, TMT suppliers in India, steel manufacturers india",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  openGraph: {
    title:
      "InfraKeys: Stainless Steel l Wire Mesh & Scaffolding Manufacturer in India",
    description:
      "Infrakeys, the best steel manufacturers in India, offered a wide range of steel, wire mesh & binding wire, scaffolding, doors & windows, nails & industrial products at reasonable prices.",
    images: [
      {
        url: "https://www.infrakeys.com/_next/static/media/banner-1.df4039c7.jpg",
        width: 800,
        height: 600,
        alt: "Infrakeys",
      },
      {
        url: "https://www.infrakeys.com/_next/static/media/banner-2.e2d2ad9e.jpg",
        width: 1800,
        height: 1600,
        alt: "Infrakeys",
      },
    ],
  },
  verification: {
    google: "kWcwy0Kag9MmpnCSMcrOL7VuQT5ZKjuBbZ6218QCpZw",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-WN9SB6DD" />
        <GoogleTagManager gtmId="AW-11427244694" />
        <Script id="interakt-chatbot">
          {`(function(w,d,s,c,r,a,m){
            w['KiwiObject']=r;
            w[r]=w[r] || function () {
              (w[r].q=w[r].q||[]).push(arguments)};
              w[r].l=1*new Date();
              a=d.createElement(s);
              m=d.getElementsByTagName(s)[0];
            a.async=1;
            a.src=c;
            m.parentNode.insertBefore(a,m)
            })(window,document,'script',"https://app.interakt.ai/kiwi-sdk/kiwi-sdk-17-prod-min.js?v="+ new Date().getTime(),'kiwi');
        window.addEventListener("load",function () {
            kiwi.init('', 'VjLmEvPfE3ANyJc8hQZKmMo3XrH3neWx', {});
        });`}
        </Script>
      </head>
      <body
        className={`${GeistSans.className} overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <Context>
          <Toaster richColors />
          <QueryProvider>
            <Layout>{children}</Layout>
          </QueryProvider>
        </Context>
      </body>
    </html>
  );
}
