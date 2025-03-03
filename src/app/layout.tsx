import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";

const geistSans = {
  variable: "--font-geist-sans",
  subsets: ["latin"],
};

const geistMono = {
  variable: "--font-geist-mono",
  subsets: ["latin"],
};

export const metadata: Metadata = {
  title: {
    default: "Product Catalog",
    template: "%s - Product Catalog",
  },
  description: "Product Catalog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <Navbar />
        {children}
       
      </body>
    </html>
  );
}
