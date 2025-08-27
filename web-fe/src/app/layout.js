import { GeistSans } from "geist/font/sans";
import "./globals.css";
import QueryProvider from "@/components/QueryClientProvider";
import { Toaster } from "sonner";
import Context from "@/store/context";
import Layout from "@/components/layout";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Script from "next/script";
import InteraktChatbot from "@/components/whatsapp-chatbot";
import GoogleAnalyticss from "./GoogleAnalytics";
import LoginDialogProvider from "@/store/login-dialog-context";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Infrakeys: Mild steel, PEB & Scaffolding",
    // template: "%s | Infrakeys",
  },
  description:
    "Powering Infrastructure with Smart Solutions We simplify infrastructure with end-to-end material supply, precision manufacturing, and smart financing solutions. From steel and PEB structures to scaffolding and crash barriers, we deliver quality, speed, and cost-efficiency. Our tech-driven platform ensures real-time tracking, seamless procurement, and flexible financing – empowering businesses to build faster and smarter. Building Tomorrow, Financing Today.",
  keywords:
    "Steel Manufacturers in india, steel fabricators near me,industrial steel in faridabad, Steel supplier in India, scaffolding manufacturer in faridabad, TMT suppliers in faridabad, PEB manufacturers in India, PEB manufacturers, steel supplier in faridabad, steel manufacturers,india, industrial steel in india, scaffolding manufacturer in India, TMT suppliers in India, steel manufacturers india",
  alternates: {
    canonical: `/`,
  },
  openGraph: {
    title: "Infrakeys: Mild steel, PEB & Scaffolding",
    description:
      "Powering Infrastructure with Smart Solutions We simplify infrastructure with end-to-end material supply, precision manufacturing, and smart financing solutions. From steel and PEB structures to scaffolding and crash barriers, we deliver quality, speed, and cost-efficiency. Our tech-driven platform ensures real-time tracking, seamless procurement, and flexible financing – empowering businesses to build faster and smarter. Building Tomorrow, Financing Today.",
    images: [
      {
        url: "https://www.infrakeys.com/_next/static/media/banner-1.d4ebdb1b.webp",
        width: 800,
        height: 600,
        alt: "Infrakeys",
      },
      {
        url: "https://www.infrakeys.com/_next/static/media/banner-3.72569777.webp",
        width: 800,
        height: 600,
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
        <GoogleAnalytics gaId="AW-11427244694" />
        <GoogleAnalyticss />
        <InteraktChatbot />
        <Script id="gtag" strategy="afterInteractive">
          {`gtag("event", "conversion", {
            send_to: "AW-11427244694/lnYGCJrDgdsZEJbV98gq",
          })`}
        </Script>
        {/* <!-- Meta Pixel Code --> */}
        <Script id="fb-pixel-script" strategy="afterInteractive">
          {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '566159103092760');
          fbq('track', 'PageView');
        `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=566159103092760&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {/* <!-- End Meta Pixel Code --> */}
      </head>
      <body
        className={`${GeistSans.className} overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <QueryProvider>
          <Context>
            <LoginDialogProvider isActive={false}>
              <Toaster richColors />
              <Layout>{children}</Layout>
            </LoginDialogProvider>
          </Context>
        </QueryProvider>
      </body>
    </html>
  );
}
