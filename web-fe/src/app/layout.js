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
    title:
      "InfraKeys: Stainless Steel l Wire Mesh & Scaffolding Manufacturer in India",
    description:
      "Infrakeys, the best steel manufacturers in India, offered a wide range of steel, wire mesh & binding wire, scaffolding, doors & windows, nails & industrial products at reasonable prices.",
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
  },
  verification: {
    google: "kWcwy0Kag9MmpnCSMcrOL7VuQT5ZKjuBbZ6218QCpZw",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId="GTM-WN9SB6DD" />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WN9SB6DD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
