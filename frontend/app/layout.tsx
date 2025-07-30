import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "E-Commerce Store - Premium Shopping Experience",
  description: "Discover premium products with fast shipping and excellent customer service. Shop the latest trends in fashion, electronics, and more.",
  keywords: "e-commerce, shopping, fashion, electronics, online store",
  authors: [{ name: "E-Commerce Store" }],
  openGraph: {
    title: "E-Commerce Store - Premium Shopping Experience",
    description: "Discover premium products with fast shipping and excellent customer service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
