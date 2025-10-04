import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/providers/AuthProvider";

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
        <AuthProvider>
          <div className="flex">
            <main className="w-full">
              <Navbar />
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
