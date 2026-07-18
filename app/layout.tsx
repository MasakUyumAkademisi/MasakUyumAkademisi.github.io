import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MASAK Sınav Hazırlık",
  description:
    "MASAK uyum görevlisi yetkilendirme sınavı için ders, soru çözüm ve deneme prototipi.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "MASAK Hazırlık",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/app-icon.svg",
  },
  openGraph: {
    title: "MASAK Sınav Hazırlık",
    description:
      "Ders anlatımı, hızlı tekrar kartları ve açıklamalı soru çözümüyle MASAK sınav çalışma prototipi.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "MASAK Sınav Hazırlık",
    description:
      "MASAK uyum görevlisi yetkilendirme sınavı için PWA prototipi.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f7f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
