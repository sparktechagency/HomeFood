// app/providers.tsx
"use client";

import { CookiesProvider } from "react-cookie";

export default function CookieProv({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      {children}
    </CookiesProvider>
  );
}
