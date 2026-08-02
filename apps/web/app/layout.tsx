import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SocketProvider } from "../context/socketProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const siteUrl = "https://orbit-ai.vercel.app"; // Replace with your domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Orbit AI | AI Chat Rooms with Voice Calls",
    template: "%s | Orbit AI",
  },

  description:
    "Orbit AI is a real-time AI chat platform where you can create rooms, collaborate with AI, chat with friends, and talk using voice calls.",

  keywords: [
    "Orbit AI",
    "AI Chat",
    "AI Chat Room",
    "Voice AI",
    "AI Assistant",
    "ChatGPT Alternative",
    "Real Time Chat",
    "Voice Call",
    "AI Collaboration",
    "Next.js",
  ],

  authors: [
    {
      name: "Orbit AI",
    },
  ],

  creator: "Orbit AI",
  publisher: "Orbit AI",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Orbit AI",
    description:
      "Create AI-powered chat rooms with real-time messaging and voice calls.",
    url: siteUrl,
    siteName: "Orbit AI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Orbit AI",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Orbit AI",
    description: "Real-time AI chat rooms with voice calls and collaboration.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SocketProvider>{children}</SocketProvider>
      </body>
    </html>
  );
}
