import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kaiwaa",
  description: "Kaiwaa is a realtime chat app built with Next js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
