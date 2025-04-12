'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI("AIzaSyAIbSfPzO8yC7Zgb9zPdtyOs2So9somuDs"); // Replace with your API key

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ConversationalAI() {
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // System instructions for the AI
  const systemInstructions = `You are a helpful AI tutor discussing the provided notes or text. 
Your goal is to:
1. Help users understand the content better
2. Answer questions about the material
3. Provide relevant examples and explanations
4. Encourage critical thinking through thoughtful questions
Base all your responses on the provided text content only.`;

  const handleChat = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      
      // Add user message to chat
      const newMessages = [...messages, { role: 'user' as const, content: input }];
      setMessages(newMessages);
      setInput('');

      // Create context from extracted text and chat history
      const context = extractedText 
        ? `Context from uploaded image/notes:\n${extractedText}\n\n` 
        : '';

      // Get Gemini response
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
      
      const prompt = `${systemInstructions}\n\n${context}${input}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Add AI response to chat
      setMessages([...newMessages, { role: 'assistant' as const, content: text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([...messages, { 
        role: 'assistant' as const, 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSubmit = async () => {
    if (!imageFile) {
      setMessages([...messages, { 
        role: 'assistant' as const, 
        content: '⚠️ Please upload an image first.' 
      }]);
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/image-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process the image');
      }

      const data = await response.json();
      if (data.error) {
        setMessages([...messages, { 
          role: 'assistant' as const, 
          content: `⚠️ Error: ${data.error}` 
        }]);
      } else {
        setExtractedText(data.text);
        setMessages([...messages, { 
          role: 'assistant' as const, 
          content: `I've processed the image and extracted the text. You can now ask me questions about it!` 
        }]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setMessages([...messages, { 
        role: 'assistant' as const, 
        content: `⚠️ Error: ${errorMessage}` 
      }]);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1e002e] to-[#0e0e0e] text-white p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-purple-200 text-center">🧠 AI Study Buddy</h1>
        
        {/* Image Upload Section */}
        <section className="bg-[#2e003e] rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-purple-100">📷 Upload Study Material</h2>
          <p className="text-purple-300">Upload an image of your notes or textbook page to discuss.</p>

          <input
            type="file"
            accept="image/*"
            className="w-full rounded bg-[#1a0028] text-white p-2 border border-purple-700"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />

          <div className="flex justify-end">
            <button
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow"
              onClick={handleImageSubmit}
            >
              Process Image
            </button>
          </div>
        </section>

        {/* Chat Section */}
        <section className="bg-[#2e003e] rounded-2xl p-6 shadow-lg space-y-4">
          <h2 className="text-2xl font-semibold text-purple-100">💬 Discussion</h2>
          
          {/* Chat Messages */}
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-purple-900/50 ml-8'
                    : 'bg-black/50 mr-8'
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <textarea
              placeholder="Ask a question about the material..."
              className="flex-1 p-4 rounded-lg text-white bg-[#1a0028] border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleChat();
                }
              }}
            />
            <button
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow disabled:opacity-50"
              onClick={handleChat}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? 'Thinking...' : 'Send'}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
