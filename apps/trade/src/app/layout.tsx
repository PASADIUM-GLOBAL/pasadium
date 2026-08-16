import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@pasadium/config";

export const metadata: Metadata = {
  title: `Trade | ${brand.name}`,
  description: "PASADIUM Trading Console",
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
