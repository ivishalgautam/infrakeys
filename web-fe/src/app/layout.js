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
  title: { default: "Infrakeys", template: "%s | Infrakeys" },
  description: "Infrakeys",
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
