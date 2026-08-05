import type { Metadata } from "next";

import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SocketProvider } from "@/context/socketProvider";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = "https://orbit-ai.vercel.app"; // Replace with your domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Orbit AI ",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("dark", geist.variable, mono.variable)}
    >
      <body className="bg-background font-sans antialiased">
        <SocketProvider>{children}</SocketProvider>
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            classNames: {
              toast:
                "bg-[#050805] border border-emerald-900 text-zinc-100 shadow-[0_0_20px_rgba(16,185,129,0.08)]",
              title: "text-emerald-400 font-mono",
              description: "text-zinc-400 font-mono",
              closeButton:
                "border border-emerald-900 bg-[#050805] text-emerald-400 hover:bg-emerald-500/10",
            },
          }}
        />
      </body>
    </html>
  );
}
