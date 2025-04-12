'use client'

import { useState } from 'react'

const prompts = [
  "Explain Simple Present Tense with examples.",
  "What is the difference between Past Perfect and Past Continuous?",
  "Describe the use of Present Perfect in real-life situations.",
  "How do you form Future Continuous Tense?"
]

const mockFeedback = {
  text: "Great job explaining the Simple Present Tense! You effectively highlighted how it's used to describe actions that happen regularly, facts, and general truths. Your clear examples helped demonstrate these concepts really well. It's clear that you understand the importance of this tense in everyday language. Keep up the excellent work—your ability to explain these core ideas with such clarity is impressive!",
  audio: "audio.mp3",
  usedKeywords: ["happen regularly", "facts", "general truths", "clear examples"]
}

export default function TeachbackPage() {
  const [currentPrompt, setCurrentPrompt] = useState(0)
  const [textInput, setTextInput] = useState('')
  const [recording, setRecording] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const handleNext = () => {
    setTextInput('')
    setSubmitted(false)
    setCurrentPrompt((prev) => (prev + 1) % prompts.length)
  }

  return (
    <main className="min-h-screen bg-[#0e0e0e] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Prompt */}
        <div className="bg-[#1a1a2e] border border-purple-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-4">🧠 Teachback Prompt</h2>
          <p className="text-purple-100">{prompts[currentPrompt]}</p>
        </div>

        {/* Text Teachback */}
        <div className="bg-[#1a1a2e] border border-purple-800 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-purple-200">📝 Text Teachback</h3>
          <textarea
            placeholder="Type your explanation here..."
            className="w-full bg-black text-white border border-purple-700 rounded-md p-3"
            rows={5}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        {/* Voice Teachback */}
        <div className="bg-[#1a1a2e] border border-purple-800 rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-purple-200">🎤 Voice Teachback</h3>
          <button
            onClick={() => setRecording(!recording)}
            className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition cursor-pointer"
          >
            {recording ? '⏹ Stop Recording' : '🎙 Start Recording'}
          </button>
          {recording && <p className="text-sm text-purple-300 mt-2">Recording... (simulated)</p>}
        </div>

        {/* Controls */}
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-white cursor-pointer"
          >
            ✅ Submit
          </button>
          <button
            onClick={handleNext}
            className="border border-purple-600 text-purple-300 px-4 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
          >
            🔄 Next Question
          </button>
        </div>

        {/* Feedback Section */}
        {submitted && (
          <div className="space-y-6">
            {/* Text Feedback */}
            <div className="bg-[#21213b] border border-green-700 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-green-400">📋 Feedback (Text)</h3>
              <p className="text-green-200">{mockFeedback.text}</p>
            </div>

            {/* Audio Feedback */}
            <div className="bg-[#21213b] border border-blue-700 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">🔊 Feedback (Audio)</h3>
              <audio controls>
                  <source src="audio.mp3" type="audio/mpeg"></source>
              </audio>
            </div>

                {/* Used Keywords */}
                <div className="bg-[#21213b] border border-red-700 rounded-lg p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-red-400">❗ Keywords Used</h3>
                  <ul className="list-disc list-inside text-red-200 space-y-1">
                    {mockFeedback.usedKeywords.map((kw, idx) => (
                      <li key={idx}>{kw}</li>
                    ))}
                  </ul>
                </div>
            </div>
        )}
          </div>
    </main>
  )
}
