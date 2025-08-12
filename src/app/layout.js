import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextJS Boilerplate with Transitions",
  description: "A NextJS boilerplate with smooth page transitions using GSAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
      <main className="w-2/3 mx-auto p-1" >
          <Navigation />
          {children}
      </main>
      </body>
    </html>
  );
}
