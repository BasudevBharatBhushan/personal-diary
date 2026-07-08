import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "B3 OS",
  description: "A calm, colorful personal operating system.",
};

export const viewport: Viewport = {
  themeColor: "#38bdf8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} ${nunito.variable} font-body antialiased`}>
        <Sidebar />
        <div className="min-h-screen md:pl-60">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
