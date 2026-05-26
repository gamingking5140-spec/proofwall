"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

type StatCard = {
  label: string;
  value: string | number;
  sub: string;
  icon: string;
  accent: string;
  glow: string;
};

export default function DashboardPage() {
  const [proofCount, setProofCount] = useState(0);
  const [username, setUsername] = useState("Creator");
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (user.email) {
      setUsername(user.email.split("@")[0]);
    }

    const { count } = await supabase
      .from("proofs")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    setProofCount(count || 0);
    setLoaded(true);
  };

  const stats: StatCard[] = [
    {
      label: "Total Proofs",
      value: proofCount,
      sub: "on your wall",
      icon: "🏆",
      accent: "rgba(124,109,250,0.12)",
      glow: "rgba(124,109,250,0.25)",
    },
    {
      label: "Total Views",
      value: "1.2M",
      sub: "+18% this month",
      icon: "👁️",
      accent: "rgba(232,121,249,0.1)",
      glow: "rgba(232,121,249,0.2)",
    },
    {
      label: "Brand Deals",
      value: "8",
      sub: "via ProofWall",
      icon: "🤝",
      accent: "rgba(52,211,153,0.08)",
      glow: "rgba(52,211,153,0.2)",
    },
  ];

  const quickActions = [
    { href: "/create",  label: "Add New Proof", icon: "✦", primary: true },
    { href: "/profile", label: "View Profile",  icon: "↗", primary: false },
  ];

  return (
    <main
      className="min-h-screen relative"
      style={{ background: "var(--background)", color: "var(--foreground)", zIndex: 1 }}
    >
      {/* Ambient glow top */}
      <div style={{
        position: "absolute", top: 0, left: "30%",
        width: 500, height: 300,
        background: "radial-gradient(circle, rgba(124,109,250,0.07) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      <div className="relative max-w-5xl mx-auto px-6 py-12" style={{ zIndex: 1 }}>

        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 animate-fade-up`}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "0.4rem",
              }}
            >
              Welcome back
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {loaded ? (
                <>Hey, <span className="gradient-text">{username}</span> 👋</>
              ) : (
                <span style={{ color: "var(--muted)" }}>Loading...</span>
              )}
            </h1>
          </div>

          <div className="flex gap-3">
            {quickActions.map(({ href, label, icon, primary }) => (
              <Link key={href} href={href}>
                {primary ? (
                  <button className="btn-primary" style={{ padding: "11px 22px", fontSize: "0.9rem", borderRadius: "12px" }}>
                    {icon} {label}
                  </button>
                ) : (
                  <button className="btn-secondary" style={{ padding: "11px 22px", fontSize: "0.9rem", borderRadius: "12px" }}>
                    {label} {icon}
                  </button>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {stats.map(({ label, value, sub, icon, accent, glow }, i) => (
            <div
              key={label}
              className={`card-hover glass animate-fade-up delay-${(i + 1) * 100}`}
              style={{
                padding: "1.75rem",
                borderRadius: "18px",
                background: accent,
                border: "1px solid rgba(255,255,255,0.07)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Icon glow bg */}
              <div style={{
                position: "absolute", top: -20, right: -20,
                width: 80, height: 80,
                background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
                filter: "blur(12px)",
              }} />

              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{icon}</div>
              <div
                className="stat-number"
                style={{ fontSize: "2.25rem", lineHeight: 1, marginBottom: "0.25rem" }}
              >
                {loaded || label !== "Total Proofs" ? value : "—"}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.82rem", fontFamily: "var(--font-display)", fontWeight: 600, marginTop: 2 }}>
                {label}
              </div>
              <div style={{ color: "var(--muted)", fontSize: "0.75rem", marginTop: 4, opacity: 0.7 }}>
                {sub}
              </div>
            </div>
          ))}
        </div>

        {/* Activity / placeholder panel */}
        <div
          className="glass animate-fade-up delay-400"
          style={{
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.06)",
            padding: "2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                letterSpacing: "-0.01em",
              }}
            >
              Recent Activity
            </h2>
            <Link href="/profile">
              <span style={{ color: "var(--accent-bright)", fontSize: "0.8rem", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                View all →
              </span>
            </Link>
          </div>

          {proofCount === 0 && loaded ? (
            <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✦</div>
              <p style={{ color: "var(--muted)", marginBottom: "1.25rem" }}>
                Your proof wall is empty — start building your credibility.
              </p>
              <Link href="/create">
                <button className="btn-primary" style={{ padding: "11px 28px", fontSize: "0.9rem", borderRadius: "12px" }}>
                  Add Your First Proof
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[...Array(Math.min(proofCount, 3))].map((_, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "rgba(124,109,250,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1rem",
                  }}>
                    🚀
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem" }}>
                      Proof #{i + 1}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: "0.78rem" }}>Published recently</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}