"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handlePublish = async () => {
    if (!title || !description) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You are not logged in");
      setLoading(false);
      return;
    }

let imageUrl = "";

if (image) {
  const fileName = Date.now() + "-" + image.name;

  const { error: uploadError } = await supabase.storage
    .from("proof-images")
    .upload(fileName, image);

  if (uploadError) {
    console.log(uploadError);
    alert("Image upload failed");
    setLoading(false);
    return;
  }

  const { data } = supabase.storage
    .from("proof-images")
    .getPublicUrl(fileName);

  imageUrl = data.publicUrl;
}

const { error } = await supabase.from("proofs").insert([
  {
    title,
    description,
    emoji: "🚀",
    user_id: user.id,
    image_url: imageUrl,
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
      setImage(null);
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

          <div>
            <label className="block mb-2 text-zinc-400">
              Upload Proof Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4"
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