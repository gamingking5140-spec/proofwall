"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (!user) {
      alert("You are not logged in");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("proofs").insert([
      {
        title,
        description,
        emoji: "🚀",
        user_id: user.id,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error saving proof");
      console.log(error);
    } else {
      alert("Proof published!");

      setTitle("");
      setDescription("");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Add New Proof
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-zinc-400">
              Proof Title
            </label>

            <input
              type="text"
              placeholder="e.g. Hit 1M Views"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 text-zinc-400">
              Description
            </label>

            <textarea
              placeholder="Tell people about this achievement..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 h-40 outline-none"
            />
          </div>

          <button
            onClick={handlePublish}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl font-bold hover:scale-[1.02] transition"
          >
            {loading ? "Publishing..." : "Publish Proof"}
          </button>
        </div>
      </div>
    </main>
  );
}