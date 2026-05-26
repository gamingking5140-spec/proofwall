import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <section className="max-w-6xl mx-auto px-6 py-24 text-center">

        <div className="inline-block px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm mb-6">
          🚀 Built for Creators
        </div>

        <h1 className="text-6xl md:text-7xl font-black leading-tight">
          Turn Your Creator Wins
          <br />
          Into a Public
          <span className="text-zinc-400"> Proof Wall</span>
        </h1>

        <p className="text-zinc-400 text-xl mt-8 max-w-2xl mx-auto">
          Show brands your growth, achievements, screenshots,
          milestones, and creator credibility — all in one link.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">

          <Link
            href="/login"
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            href="/profile"
            className="border border-zinc-700 px-8 py-4 rounded-2xl font-bold hover:bg-zinc-900 transition"
          >
            View Demo
          </Link>

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <div className="text-4xl mb-4">📈</div>

            <h3 className="text-2xl font-bold">
              Show Growth
            </h3>

            <p className="text-zinc-400 mt-4">
              Display your views, subscribers, revenue,
              and creator milestones publicly.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <div className="text-4xl mb-4">🤝</div>

            <h3 className="text-2xl font-bold">
              Win Brand Deals
            </h3>

            <p className="text-zinc-400 mt-4">
              Build trust with brands using proof instead
              of just follower counts.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
            <div className="text-4xl mb-4">⚡</div>

            <h3 className="text-2xl font-bold">
              One Link Portfolio
            </h3>

            <p className="text-zinc-400 mt-4">
              Replace messy screenshots and media kits
              with one clean creator profile.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}