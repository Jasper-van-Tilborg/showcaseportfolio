import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'block',
  preload: true,
});

export const metadata: Metadata = {
  title: "Jasper van Tilborg - Designer & Front-End Developer",
  description: "Portfolio van Jasper van Tilborg, Designer & Front-End Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={poppins.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
