"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import CookieProv from "@/hooks/cookie-prov";
import store from "../redux/store";
import { Provider } from "react-redux";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>HomeFood</title>
        <meta name="description" content="Wew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
