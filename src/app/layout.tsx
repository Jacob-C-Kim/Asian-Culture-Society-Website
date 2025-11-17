import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Asian Culture Society",
  description: "Asian Culture Society at RIT",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
