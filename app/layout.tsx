import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Blocksmiths | Book a Training Session",
  description:
    "Expert offensive and defensive line training for youth athletes ages 8–18. Book group sessions, 1:1 coaching, or team training with Coach Cooper.",
  openGraph: {
    title: "Blocksmiths | Book a Training Session",
    description:
      "Expert offensive and defensive line training for youth athletes ages 8–18.",
    siteName: "Blocksmiths",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
