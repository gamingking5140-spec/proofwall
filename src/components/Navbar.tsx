"use client";

import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-zinc-800 bg-black text-white">

      <Link href="/" className="text-2xl font-bold">
        ProofWall
      </Link>

      <div className="flex items-center gap-6">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/create">
          Create
        </Link>

        <Link href="/profile">
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}