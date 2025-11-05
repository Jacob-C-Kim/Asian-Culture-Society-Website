import "./globals.css";
import Providers from "./providers";
import Nav from "@/components/Nav";

export const metadata = {
  title: "ACS Workspace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white text-gray-900">
        <Providers>
          <Nav />
          <main className="mx-auto max-w-6xl p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}