'use client';

import { useState } from 'react';
import Link from 'next/link';

const topics = [
  {
    title: 'Tenses',
    description:
      'Tenses indicate the time of action. They are divided into Present, Past, and Future. Each of these is further categorized into Simple, Continuous, Perfect, and Perfect Continuous tenses. Understanding tenses is essential for constructing correct sentences and expressing time accurately in English.',
    href: '/class8/english/tenses',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghNEAGuOzmNfZB7L7lo2nVbOi8cuPj4ggNA&s',
  },
  {
    title: 'Nouns',
    description:
      'Nouns are the names of people, places, things, or ideas. They are the building blocks of sentences. Learn about common, proper, collective, and abstract nouns in this topic to strengthen your grammar fundamentals and understand sentence structure more clearly.',
    href: '/class8/english/nouns',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghNEAGuOzmNfZB7L7lo2nVbOi8cuPj4ggNA&s',
  },
  {
    title: 'Adjectives',
    description:
      'Adjectives describe or modify nouns and pronouns. They help in adding detail and meaning to your sentences. Understand types like descriptive, quantitative, demonstrative, and more, with plenty of examples to help grasp the concept better.',
    href: '/class8/english/adjectives',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghNEAGuOzmNfZB7L7lo2nVbOi8cuPj4ggNA&s',
  },
  {
    title: 'Prepositions',
    description:
      'Prepositions show the relationship of a noun or pronoun with other words in the sentence. They often indicate direction, place, or time. Mastering prepositions can improve your writing clarity and help in forming more complex sentences.',
    href: '/class8/english/prepositions',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghNEAGuOzmNfZB7L7lo2nVbOi8cuPj4ggNA&s',
  },
  {
    title: 'Conjunctions',
    description:
      'Conjunctions join words, phrases, or clauses together. They are essential for creating complex and compound sentences. Learn the different types—coordinating, subordinating, and correlative—with examples.',
    href: '/class8/english/conjunctions',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghNEAGuOzmNfZB7L7lo2nVbOi8cuPj4ggNA&s',
  },
  {
    title: 'Active and Passive Voice',
    description:
      'Voice refers to the form of a verb that shows whether the subject is doing the action or receiving it. In active voice, the subject performs the action; in passive voice, the subject receives the action. Learn the rules to convert between them easily.',
    href: '/class8/english/voice',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQghNEAGuOzmNfZB7L7lo2nVbOi8cuPj4ggNA&s',
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
          Class 8 English Topics
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
