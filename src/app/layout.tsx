'use client'

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CookieProv from "@/hooks/cookie-prov";
import store from "../redux/store";

import { Provider } from "react-redux";
// export const metadata: Metadata = {
//   title: "HomeFood",
//   description: "Wew",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>

          <CookieProv>
            {children}
            <Toaster richColors />
          </CookieProv>

        </Provider>
      </body>
    </html>
  );
}
