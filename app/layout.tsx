import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { baseUrl } from "./sitemap";
import localFont from "next/font/local";

const publicSans = localFont({
  src: "./assets/fonts/PublicSans-VariableFont_wght.ttf",
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nathan Schmidt",
    template: "%s | Nathan Schmidt",
  },
  description: "Nathan Schmidt",
  openGraph: {
    title: "My Portfolio",
    description: "This is my portfolio.",
    url: baseUrl,
    siteName: "My Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={cx(publicSans.variable, "font-public-sans")}>
      <body className='text-black bg-white dark:text-white dark:bg-black'>
        <main className='bg-blur-2xl relative z-10 antialiased max-w-2xl mx-4 lg:mx-auto flex-auto mt-6 flex flex-col p-2'>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
        <div className='fixed animate-bg-three inset-0 bg-gradient-to-t from-cyan-50 to-gray-100 dark:from-cyan-950 dark:to-black/60' />
        <div className='fixed animate-bg-two inset-0 bg-gradient-to-t from-pink-50 to-gray-100 dark:from-pink-950 dark:to-black/60' />
        <div className='fixed animate-bg-one inset-0 bg-gradient-to-t from-orange-50 to-gray-100 dark:from-orange-950 dark:to-black/60' />
      </body>
    </html>
  );
}
