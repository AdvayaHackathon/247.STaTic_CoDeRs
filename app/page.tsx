'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Home() {
  const classes = {
    class8: ["English", "Kannada", "Science"],
    class9: ["English", "Kannada", "Science"],
    class10: ["English", "Kannada", "Science"],
  };

  const features = [
    { title: "🧮 Exponent Express", link: "/games/exponent-express" },
    { title: "🎙️ Voice Teachback", link: "/voice" },
    { title: "🧠 Conversational AI", link: "/conversational-ai" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#1e002e] to-[#0e0e0e] text-white">
      {/* Navbar */}
      <nav className="w-full px-6 py-4 border-b border-purple-800 bg-[#1a0028] flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white tracking-wide">EchoLearn</h1>

          {/* Class Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white border-none shadow">
                Select Class
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#2e003e] text-white border-purple-700">
              <DropdownMenuLabel className="text-purple-300">Choose Class & Subject</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-700" />
              {Object.entries(classes).map(([cls, subjects]) => (
                <DropdownMenuSub key={cls}>
                  <DropdownMenuSubTrigger className="capitalize text-white hover:bg-purple-900">
                    {cls.replace("class", "Class ")}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="bg-[#2e003e] text-white">
                    {subjects.map((subj) => (
                      <DropdownMenuItem
                        asChild
                        key={subj}
                        className="hover:bg-purple-800 hover:text-white"
                      >
                        <Link href={`/${cls}/${subj.toLowerCase()}`}>{subj}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer border-2 border-purple-500">
              <AvatarFallback className="text-purple-400 bg-black">U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#2e003e] text-white border-purple-700" align="end">
            <DropdownMenuLabel className="text-purple-300">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-purple-700" />
            <DropdownMenuItem className="hover:bg-purple-800">Profile</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-purple-800">Settings</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-purple-800">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto p-6 md:p-10 text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-purple-100">
          Learn Better by Teaching Back
        </h2>
        <p className="text-lg text-purple-300 max-w-2xl mx-auto">
          EchoLearn helps students truly understand by encouraging them to explain what they’ve learned in their own words — via voice, text, or video.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white shadow-md">
            <Link href="/teachback">Start a Teachback</Link>
          </Button>
          <Button asChild variant="secondary" className="bg-white text-purple-800 hover:bg-purple-200">
            <Link href="/archive">View Archive</Link>
          </Button>
        </div>
      </section>

      {/* Feature Cards as Horizontal Flex */}
      <section className="max-w-6xl mx-auto p-6 flex flex-wrap justify-center gap-6">
        {features.map((feature, i) => (
          <Link
            href={feature.link}
            key={i}
            className="w-[280px] rounded-2xl p-5 bg-[#f5e9ff] text-black border border-purple-600 shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2 text-purple-900">{feature.title}</h3>
            <p className="text-sm text-black">Learn more about {feature.title.split(" ")[1]}.</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
