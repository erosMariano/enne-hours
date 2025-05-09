import type { Metadata } from "next";
import "../../styles/globals.css";

import { Inter } from "next/font/google";

import Header from "@/components/views/Hero/Header";
import AuthSessionProvider from "@/components/providers/SessionProvider";

const interFont = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enne Hours",
  description: "Enne Hours",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${interFont.variable} antialiased`}>
        <AuthSessionProvider>
          <Header />
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
