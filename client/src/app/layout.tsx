import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { Providers } from "./providers";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Help Desk",
  description: "Help desk ticketing system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <Providers>
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <Header />
              <main className="mb-auto">{children}</main>
            </div>
          </SectionContainer>
        </Providers>
      </body>
    </html>
  );
}
