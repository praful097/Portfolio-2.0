import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-headline",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-label",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Praful | Product Leader & Engineer",
  description: "Building high-impact products through strategy, leadership, and flawless delivery.",
};

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 z-[100] grain-overlay pointer-events-none" />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


