"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

type Proof = {
  id: number;
  title: string;
  description: string;
  emoji: string;
};

export default function ProfilePage() {
  const [proofs, setProofs] = useState<Proof[]>([]);

  useEffect(() => {
    fetchProofs();
  }, []);

  const fetchProofs = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("proofs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) {
      setProofs(data);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="w-32 h-32 rounded-full bg-zinc-800"></div>

          <div>
            <h1 className="text-4xl font-bold">
              Ayush Creator
            </h1>

            <p className="text-zinc-400 mt-2">
              Gaming & Productivity Creator
            </p>
          </div>

        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">
            Proof Wall
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {proofs.map((proof) => (
              <div
                key={proof.id}
                className="bg-zinc-900 p-6 rounded-2xl"
              >
                <p className="text-3xl mb-4">
                  {proof.emoji}
                </p>

                <h3 className="text-xl font-bold">
                  {proof.title}
                </h3>

                <p className="text-zinc-400 mt-2">
                  {proof.description}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </main>
  );
}