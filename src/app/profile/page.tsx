"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Proof = {
  id: number;
  title: string;
  description: string;
  emoji: string;
  image_url: string;
  created_at?: string;
};

const PLATFORM_ICONS: Record<string, string> = {
  youtube: "▶", twitter: "✕", instagram: "◉", tiktok: "♪",
};

export default function ProfilePage() {
  const [proofs, setProofs] = useState<Proof[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchProofs();
  }, []);

  const fetchProofs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("proofs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) setProofs(data);
    if (error) console.log(error);
    setLoaded(true);
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--foreground)", position: "relative" }}
    >
      {/* Ambient */}
      <div style={{
        position: "fixed", top: "5%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 400,
        background: "radial-gradient(ellipse, rgba(124,109,250,0.07) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
      }} />

      <div className="relative max-w-4xl mx-auto px-6 py-12" style={{ zIndex: 1 }}>

        {/* Profile header card */}
        <div
          className="glass animate-fade-up"
          style={{
            borderRadius: 24,
            border: "1px solid rgba(124,109,250,0.18)",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
            marginBottom: "2rem",
            background: "linear-gradient(135deg, rgba(124,109,250,0.07) 0%, rgba(232,121,249,0.04) 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background pattern */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: 24,
            background: "radial-gradient(ellipse at 80% 20%, rgba(232,121,249,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }} />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div
              className="animate-float"
              style={{
                width: 88, height: 88, borderRadius: "50%",
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2rem", fontWeight: 800,
                fontFamily: "var(--font-display)",
                color: "white",
                boxShadow: "0 0 40px rgba(124,109,250,0.35)",
                flexShrink: 0,
              }}
            >
              A
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.25rem",
                }}
              >
                Ayush Creator
              </h1>
              <p style={{ color: "var(--muted)", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                Gaming & Productivity Creator
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Gaming", "Productivity", "Tech"].map(tag => (
                  <span
                    key={tag}
                    style={{
                      padding: "3px 12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 100,
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={copyProfileLink}
              className="btn-secondary"
              style={{ padding: "10px 20px", fontSize: "0.85rem", borderRadius: "12px", flexShrink: 0 }}
            >
              Share Profile ↗
            </button>
          </div>

          {/* Stats row */}
          <div
            style={{
              marginTop: "1.75rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {[
              { value: proofs.length, label: "Proofs" },
              { value: "1.2M",  label: "Total Views" },
              { value: "340K",  label: "Subscribers" },
              { value: "8",     label: "Brand Deals" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="stat-number" style={{ fontSize: "1.4rem" }}>{value}</div>
                <div style={{ color: "var(--muted)", fontSize: "0.75rem", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proof Wall */}
        <div className="animate-fade-up delay-200">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.25rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.35rem",
                letterSpacing: "-0.01em",
              }}
            >
              Proof Wall
            </h2>
            <span
              style={{
                padding: "2px 10px",
                background: "rgba(124,109,250,0.12)",
                border: "1px solid rgba(124,109,250,0.2)",
                borderRadius: 100,
                fontSize: "0.75rem",
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                color: "var(--accent-bright)",
              }}
            >
              {proofs.length}
            </span>
          </div>

          {loaded && proofs.length === 0 ? (
            <div
              className="glass"
              style={{
                borderRadius: 20, padding: "3rem",
                textAlign: "center",
                border: "1px dashed rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📭</div>
              <p style={{ color: "var(--muted)" }}>No proofs yet. Start adding your wins!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {proofs.map((proof, i) => (
                <div
                  key={proof.id}
                  className={`card-hover glass animate-fade-up`}
                  style={{
                    padding: "1.5rem",
                    borderRadius: "18px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    animationDelay: `${i * 80}ms`,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Glow dot */}
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: 100, height: 100,
                    background: "radial-gradient(circle, rgba(124,109,250,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />

                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", marginBottom: "1rem",
                  }}>
                    {proof.emoji}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      letterSpacing: "-0.01em",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {proof.image_url && (
  <img
    src={proof.image_url}
    alt={proof.title}
    className="w-full rounded-2xl mb-4"
  />
)}
                    {proof.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {proof.description}
                  </p>

                  {proof.created_at && (
                    <div
                      style={{
                        marginTop: "1rem",
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        opacity: 0.6,
                      }}
                    >
                      {new Date(proof.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}