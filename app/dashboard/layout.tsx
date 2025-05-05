import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Providers } from "../providers";

const interFont = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enne Hours | Dashboard",
  description: "Enne Hours | Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${interFont.variable}  antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
