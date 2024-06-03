import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/components/QueryClientProvider";
import { Toaster } from "sonner";
import Context from "@/store/context";
import Layout from "@/components/layout";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
