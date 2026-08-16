import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@pasadium/config";

export const metadata: Metadata = {
  title: `Media | ${brand.name}`,
  description: "PASADIUM Media & Intelligence Gateway",
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
