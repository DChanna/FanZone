import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FanZone - Your All-in-One Sports Hub",
  description:
    "Watch live sports, track bets, trade event contracts, follow scores, and connect with fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
