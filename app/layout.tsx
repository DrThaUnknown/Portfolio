import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PlanetThemeProvider } from "@/components/providers/PlanetThemeProvider";
import GalaxyBackground from "@/components/visual/GalaxyBackground";
import AppLoadingWrapper from "@/components/visual/AppLoadingWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "anthonycodes",
  description: "Made by Anthony J. Contreras Linarez",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <PlanetThemeProvider>
          <GalaxyBackground />
          <AppLoadingWrapper>
            <Navbar/>
            {children}
            <Footer/>
          </AppLoadingWrapper>
        </PlanetThemeProvider>
      </body>
    </html>
  );
}
