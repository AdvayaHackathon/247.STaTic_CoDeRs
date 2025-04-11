'use client';

import { useState } from 'react';
import Link from 'next/link';

const topics = [
  {
    title: 'Electricity Basics',
    description:
      'Will see how voltage, current, and resistance all tie together using Ohm’s Law.',
    href: '/class10/science/electricity',
    image: 'https://img.freepik.com/free-vector/electric-cables-lightning-realistic-composition_1284-26544.jpg?semt=ais_hybrid&w=740',
  },
  {
    title: 'Potential Differencens',
    description:
      'Voltage is like the push that makes electric charges move.',
    href: '/class10/science/pd',
    image: 'https://www.electroduino.com/wp-content/uploads/2021/08/What-is-Voltage-or-Potential-Difference-700x445.jpg',
  },
  {
    title: 'Ohm’s Law',
    description:
      'Ohm’s Law is like the ultimate cheat code for electric circuits.',
    href: '/class10/science/ohms',
    image: 'https://files.easybom.com/tools/20220211/1644544282405.png',
  },
];

export default function EnglishPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1e002e] to-[#0e0e0e] p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-lg font-semibold bg-[#2a003f] text-purple-300 px-5 py-3 rounded-xl shadow hover:bg-purple-800 transition-all"
        >
          ⬅ Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-purple-200 mb-10 text-center">
          Class 10 Science
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const isExpanded = expanded === index;
            const shortDesc = topic.description.slice(0, 120) + '...';

            return (
              <Link
                href={topic.href}
                key={index}
                className="flex flex-row overflow-hidden bg-[#1a1a2e] border-2 border-purple-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
              >
                {/* Text Section */}
                <div className="w-3/5 pr-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-purple-300 mb-4">{topic.title}</h2>
                    <p className="text-purple-100 text-base leading-relaxed">
                      {isExpanded ? topic.description : shortDesc}
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // prevent navigation
                          setExpanded(isExpanded ? null : index);
                        }}
                        className="ml-2 text-purple-400 text-base font-semibold underline"
                      >
                        {isExpanded ? 'Read less' : 'Read more'}
                      </button>
                    </p>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-2/5 flex items-center justify-center bg-[#2c2c3c] p-4 rounded-lg">
                  <img
                    src={topic.image}
                    alt={`${topic.title} image`}
                    className="w-full h-36 object-cover rounded-md border border-purple-700"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
