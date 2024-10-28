import React from "react";
import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Bubble || Auth",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
          <section className="flex-col-center-item flex-1 py-10">
            {children}
          </section>

          <Toaster />
      </body>
    </html>
  );
}