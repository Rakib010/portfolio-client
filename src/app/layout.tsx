import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/navbar/Sidebar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "portfolio website of Rakib Hossain",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} antialiased min-h-screen bg-gradient-to-br from-[#0a192f] to-[#112240] text-gray-300`}
      >
        <div className="flex ">
          {/* Sidebar*/}
          <Sidebar />

          {/* Main content */}
          <main className="flex-1 min-h-screen px-[5%] py-10 ml-[calc(16%+20rem)] mt-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
