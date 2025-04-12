'use client';

import { useRouter } from 'next/navigation';

export default function TensesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-zinc-900 text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => router.push('/class8/english')}
        className="mb-4 bg-zinc-700 hover:bg-zinc-600 text-purple-300 px-4 py-2 rounded-md transition"
      >
        ← Back to English Topics
      </button>

      <h1 className="text-3xl font-bold text-purple-400 mb-6">Tenses</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Teachback + YouTube */}
        <div className="lg:w-3/5 w-full flex flex-col gap-6">
          <section className="bg-zinc-800 p-5 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">🎤 Teachback</h2>
            <p className="text-zinc-300 mb-3">
              Explain what you’ve learned about tenses in your own words. Record a voice, write a short summary, or upload a short video!
            </p>
            <button
              onClick={() => router.push('/class8/english/tenses/teachback')}
              className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 hover:scale-[1.03] transition-all duration-200 cursor-pointer"
            >
              Start Teachback
            </button>
          </section>

          <section className="bg-zinc-800 p-5 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">📺 YouTube Content</h2>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/O9S70oJAivI"
                title="Tenses Explanation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        </div>

        {/* Right Side: Notes */}
        <div className="lg:w-2/5 w-full">
          <section className="bg-zinc-800 p-5 rounded-xl shadow-md h-full">
            <h2 className="text-2xl font-semibold text-purple-300 mb-3">📝 Notes</h2>
            <div className="w-full h-[500px] rounded-lg overflow-hidden border border-purple-400">
              <iframe
                src="/notes/tenses.pdf"
                className="w-full h-full"
                title="Tenses Notes"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Daily Practice */}
      <section className="bg-zinc-800 mt-10 p-5 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-purple-300 mb-3">📚 Daily Practice Set</h2>
        <ol className="list-decimal pl-6 text-zinc-300 space-y-2">
          <li>Convert 3 sentences into future perfect tense.</li>
          <li>Write a paragraph using at least 5 different tenses.</li>
          <li>Record yourself explaining the difference between past simple and past continuous.</li>
        </ol>
      </section>
    </main>
  );
}
