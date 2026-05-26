"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/create",    label: "Create" },
  { href: "/profile",   label: "Profile" },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: "rgba(8, 8, 16, 0.75)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-black"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              boxShadow: "0 0 16px var(--accent-glow)",
              fontFamily: "var(--font-display)",
            }}
          >
            P
          </div>
          <span
            className="text-xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-white">Proof</span>
            <span className="gradient-text-subtle">Wall</span>
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  color: active ? "var(--accent-bright)" : "var(--muted)",
                  background: active ? "rgba(124,109,250,0.1)" : "transparent",
                  border: active ? "1px solid rgba(124,109,250,0.2)" : "1px solid transparent",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--muted)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link href="/create" className="hidden md:block">
            <button
              className="btn-primary"
              style={{ padding: "9px 20px", fontSize: "0.85rem", borderRadius: "10px" }}
            >
              + Add Proof
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="btn-secondary"
            style={{ padding: "9px 18px", fontSize: "0.85rem", borderRadius: "10px" }}
          >
            Sign out
          </button>
        </div>

      </div>

      {/* Mobile nav */}
      <div
        className="md:hidden flex items-center gap-1 px-6 pb-3 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {navLinks.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all"
              style={{
                fontFamily: "var(--font-display)",
                color: active ? "var(--accent-bright)" : "var(--muted)",
                background: active ? "rgba(124,109,250,0.1)" : "rgba(255,255,255,0.03)",
                border: active ? "1px solid rgba(124,109,250,0.2)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}