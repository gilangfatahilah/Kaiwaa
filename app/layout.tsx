import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "DodgerBlue",
};

export const metadata: Metadata = {
  title: "Kaiwaa",
  description: "Kaiwaa is a realtime chat app built with Next js",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: "Gilang Fatahilah" }],
  icons: [
    { rel: "apple-touch-icon", url: "icon512_rounded.png" },
    { rel: "icon", url: "icon512_maskable.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ConvexClientProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
            <Toaster richColors />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
