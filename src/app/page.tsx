import Link from "next/link";

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
  return (
    <main
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: "var(--background)", position: "relative", zIndex: 1 }}
    >

      {/* Background orbs */}
      <div
        style={{
          position: "fixed", top: "10%", left: "15%",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(124,109,250,0.12) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed", top: "30%", right: "10%",
          width: 350, height: 350,
          background: "radial-gradient(circle, rgba(232,121,249,0.08) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none", zIndex: 0,
        }}
      />

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center" style={{ zIndex: 1 }}>

        {/* Badge */}
        <div className="animate-fade-up flex justify-center mb-8">
          <div className="badge">
            <span style={{ color: "var(--success)" }}>●</span>
            Built for the Creator Economy
          </div>
        </div>

        {/* Headline */}
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
          Turn Your Creator Wins<br />
          Into a{" "}
          <span className="gradient-text">Public Proof Wall</span>
        </h1>

        {/* Sub */}
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

        {/* CTAs */}
        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 36px", borderRadius: "14px" }}>
            Start Building Free
            <span>→</span>
          </Link>
          <Link href="/profile" className="btn-secondary" style={{ fontSize: "1rem", padding: "16px 36px", borderRadius: "14px" }}>
            View Demo Profile
          </Link>
        </div>

        {/* Social proof numbers */}
        <div
          className="animate-fade-up delay-500 flex flex-col sm:flex-row items-center justify-center gap-8 mt-16"
        >
          {socialProof.map(({ stat, label }) => (
            <div key={label} className="text-center">
              <div className="stat-number" style={{ fontSize: "1.75rem" }}>{stat}</div>
              <div style={{ color: "var(--muted)", fontSize: "0.8rem", fontFamily: "var(--font-display)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-16" style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(124,109,250,0.3), transparent)" }} />
      </section>

      {/* ── Features ── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24" style={{ zIndex: 1 }}>

        <div className="text-center mb-12 animate-fade-up">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent-bright)",
              marginBottom: "0.75rem",
            }}
          >
            Why ProofWall
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Everything a brand needs to say{" "}
            <span className="gradient-text-subtle">yes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map(({ emoji, title, desc, accent, border }, i) => (
            <div
              key={title}
              className={`card-hover glass animate-fade-up delay-${(i + 2) * 100}`}
              style={{
                padding: "2rem",
                borderRadius: "20px",
                border: `1px solid ${border}`,
                background: accent,
              }}
            >
              <div
                style={{
                  width: 52, height: 52,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 14,
                  fontSize: "1.6rem",
                  marginBottom: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {emoji}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: "0.6rem",
                  color: "var(--foreground)",
                }}
              >
                {title}
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.65, fontSize: "0.92rem" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* ── Bottom CTA banner ── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-24" style={{ zIndex: 1 }}>
        <div
          className="gradient-border animate-fade-up"
          style={{
            background: "linear-gradient(135deg, rgba(124,109,250,0.08) 0%, rgba(232,121,249,0.06) 100%)",
            border: "1px solid rgba(124,109,250,0.2)",
            borderRadius: 24,
            padding: "clamp(2rem, 5vw, 4rem)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Your proof is your{" "}
            <span className="gradient-text">superpower.</span>
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: "2rem", maxWidth: 440, margin: "0 auto 2rem" }}>
            Thousands of creators are already landing better brand deals with ProofWall. Join them.
          </p>
          <Link href="/login" className="btn-primary" style={{ fontSize: "1rem", padding: "16px 40px", borderRadius: "14px" }}>
            Get Started Free →
          </Link>
        </div>
      </section>

    </main>
  );
}