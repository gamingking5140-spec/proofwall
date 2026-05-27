"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const features = [
  {
    emoji: "📈",
    title: "Show Real Growth",
    desc: "Display views, subscribers, revenue, and milestones that brands can actually verify.",
    accent: "rgba(124, 109, 250, 0.15)",
    border: "rgba(124, 109, 250, 0.25)",
  },
  {
    emoji: "🤝",
    title: "Win Brand Deals",
    desc: "Build trust with receipts instead of follower counts. Let your proof do the pitching.",
    accent: "rgba(232, 121, 249, 0.12)",
    border: "rgba(232, 121, 249, 0.2)",
  },
  {
    emoji: "⚡",
    title: "One Link Portfolio",
    desc: "Replace messy media kits with a single creator profile that converts.",
    accent: "rgba(52, 211, 153, 0.1)",
    border: "rgba(52, 211, 153, 0.2)",
  },
];

const socialProof = [
  { stat: "12K+", label: "Creators" },
  { stat: "$2.4M", label: "Deals Closed" },
  { stat: "340M+", label: "Views Tracked" },
];

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.push("/dashboard");
    }
  };

  return (
    <main
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: "var(--background)", position: "relative", zIndex: 1 }}
    >

      <div
        style={{
          position: "fixed", top: "10%", left: "15%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(124,109,250,0.12) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
        }}
      />

      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center" style={{ zIndex: 1 }}>

        <div className="animate-fade-up flex justify-center mb-8">
          <div className="badge">
            <span style={{ color: "var(--success)" }}>●</span>
            Built for the Creator Economy
          </div>
        </div>

        <h1
          className="animate-fade-up delay-100"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}
        >
          Turn Your Creator Wins
          <br />
          Into a{" "}
          <span className="gradient-text">Public Proof Wall</span>
        </h1>

        <p
          className="animate-fade-up delay-200 mx-auto"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.15rem",
            color: "var(--muted)",
            lineHeight: 1.7,
            maxWidth: 560,
            marginBottom: "2.5rem",
          }}
        >
          Show brands your growth, achievements, and creator credibility — all in one powerful link.
        </p>

        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 36px", borderRadius: "14px" }}>
            Start Building Free →
          </Link>

          <Link href="/profile" className="btn-secondary" style={{ fontSize: "1rem", padding: "16px 36px", borderRadius: "14px" }}>
            View Demo Profile
          </Link>
        </div>

      </section>
    </main>
  );
}