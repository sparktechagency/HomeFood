import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CookieProv from "@/hooks/cookie-prov";

export const metadata: Metadata = {
  title: "HomeFood",
  description: "Wew",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CookieProv>
          {children}
          <Toaster richColors />
        </CookieProv>
      </body>
    </html>
  );
}
