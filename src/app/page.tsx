export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          ProofWall
        </h1>

        <p className="text-zinc-400 text-lg">
          Turn your creator wins into a public proof wall.
        </p>

        <button className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition">
          <a
  href="/dashboard"
  className="bg-white text-black px-6 py-3 rounded-xl font-bold inline-block mt-6"
>
  Get Started
</a>
        </button>
      </div>
    </main>
  );
}