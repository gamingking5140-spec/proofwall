"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function DashboardPage() {
  const [proofCount, setProofCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { count } = await supabase
      .from("proofs")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("user_id", user.id);

    setProofCount(count || 0);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Total Proofs
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {proofCount}
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Total Views
          </p>

          <h2 className="text-3xl font-bold mt-2">
            1.2M
          </h2>
        </div>

        <div className="bg-zinc-900 p-6 rounded-2xl">
          <p className="text-zinc-400">
            Brand Deals
          </p>

          <h2 className="text-3xl font-bold mt-2">
            8
          </h2>
        </div>

      </div>

    </main>
  );
}