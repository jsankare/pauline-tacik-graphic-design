import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/Navigation";
import Footer from "@/app/components/Footer";

// TODO: Change font to desired font

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Graphisme Design Pauline Tacik",
  description: "Portfolio de Pauline Tacik, graphiste et designer, gravures, illustrations et créations graphiques.",
  // TODO: Add Open Graph metadata
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex">
          <aside className="w-64 shrink-0 border-r border-neutral-200 p-5">
            <Navigation />
          </aside>
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
