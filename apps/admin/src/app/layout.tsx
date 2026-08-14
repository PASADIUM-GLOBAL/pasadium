import type { Metadata } from "next";
import "./globals.css";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { brand } from "@shared/config";

export const metadata: Metadata = {
  title: `Admin | ${brand.name}`,
  description: "PASADIUM Platform Administration Console",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}
