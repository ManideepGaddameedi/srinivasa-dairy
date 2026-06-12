import type { Metadata } from "next";
import "./globals.css";

import Script from "next/script";

export const metadata: Metadata = {
  title: "Srinivasa Dairy",
  description: "Premium Traditional Ghee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="en">

      <body>

        {children}

        {/* RAZORPAY SCRIPT */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      </body>

    </html>

  );

}