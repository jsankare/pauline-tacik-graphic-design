import localFont from "next/font/local";
import "./globals.css";
import RootShell from "./components/RootShell";
import {CustomCursor} from "@/app/components/CustomCursor";

const Aracau = localFont({
    src: [
        {
            path: "../fonts/AcarauDisplayRg.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/AcarauDisplayRg.woff2",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-aracau",
    display: "swap"
});

export const metadata = {
  title: "Graphisme Design Pauline Tacik",
  description: "Portfolio de Pauline Tacik, graphiste et designer, gravures, illustrations et créations graphiques.",
};

export default function RootLayout({ children }) {
  return (
      <html lang="fr">
          <head>
              <link rel="stylesheet" href="https://use.typekit.net/kuk3zwb.css" />
          </head>
          <body className={`${Aracau.variable} font-omnes-semicond`}>
              <RootShell>
              <CustomCursor />
                {children}
              </RootShell>
          </body>
      </html>
  );
}
