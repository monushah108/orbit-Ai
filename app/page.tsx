"use client";

import Features from "@/components/home/feat";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import { Navbar } from "@/components/home/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* ========================= HERO ========================= */}
      {/* Hero */}
      <Hero />

      {/* ========================= Features ========================= */}
      <Features />

      {/* ========================= FOOTER ========================= */}
      <Footer />
    </div>
  );
}
