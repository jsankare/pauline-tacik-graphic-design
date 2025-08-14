import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootShell from "./components/RootShell";

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
};

export default function RootLayout({ children }) {
  return (
      <html lang="fr">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
              <RootShell>
                {children}
              </RootShell>
          </body>
      </html>
  );
}
