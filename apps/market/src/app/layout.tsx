import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@shared/config";

export const metadata: Metadata = {
  title: `Market | ${brand.name}`,
  description: "PASADIUM Digital Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
