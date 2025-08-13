import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/components/Navigation";
import MobileNavigation from "@/app/components/MobileNavigation";
import Footer from "@/app/components/Footer";

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
  description:
      "Portfolio de Pauline Tacik, graphiste et designer, gravures, illustrations et créations graphiques.",
};

export default function RootLayout({ children }) {
  return (
      <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {/* Mobile Navigation */}
      <MobileNavigation />

      <div className="min-h-screen flex">
        {/* Desktop navigation */}
        <aside className="hidden md:block w-64 shrink-0 border-r border-neutral-200 p-5">
          <Navigation />
        </aside>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>

      <Footer />
      </body>
      </html>
  );
}
