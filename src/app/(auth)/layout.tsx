import Footer from "@/components/core/footer";
import Navbar from "@/components/core/navbar";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Suspense fallback={"Please wait a second.."}>{children}</Suspense>
      <Footer />
    </>
  );
}
