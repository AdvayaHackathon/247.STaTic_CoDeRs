'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Operation = {
  label: string;
  apply: (x: number) => number;
  desc: string;
};

type GameState = {
  ops: Operation[];
  target: number;
  current: number;
  solution: number[];
};

const getRandomOperators = (): Operation[] => {
  const availableOps: Operation[] = [
    { label: "+2", apply: (x) => x + 2, desc: "Add 2 to the current number" },
    { label: "*2", apply: (x) => x * 2, desc: "Multiply the current number by 2" },
    { label: "*3", apply: (x) => x * 3, desc: "Multiply the current number by 3" },
    { label: "+5", apply: (x) => x + 5, desc: "Add 5 to the current number" },
    { label: "-2", apply: (x) => x - 2, desc: "Subtract 2 from the current number" },
    { label: "*4", apply: (x) => x * 4, desc: "Multiply the current number by 4" },
    { label: "/2", apply: (x) => Math.floor(x / 2), desc: "Divide the current number by 2" },
  ];

  const shuffledOps = availableOps.sort(() => Math.random() - 0.5);
  return shuffledOps.slice(0, 4);
};

const getValidSolution = (current: number, target: number, ops: Operation[], maxMoves: number): number[] => {
  const queue: { val: number; path: number[] }[] = [{ val: current, path: [current] }];
  const visited = new Set<number>();

  while (queue.length) {
    const { val, path } = queue.shift()!;
    if (path.length > maxMoves + 1) continue; // +1 to account for initial number

    if (val === target) return path;

    for (const op of ops) {
      const next = op.apply(val);
      if (visited.has(next) || next < 1 || next > 1000) continue;
      visited.add(next);
      queue.push({ val: next, path: [...path, next] });
    }
  }

  return [];
};

const getGame = (): GameState => {
  const maxMoves = 5;
  const current = Math.floor(Math.random() * 10) + 1;
  const ops = getRandomOperators();

  let solution: number[] = [];
  let target = 0;
  let attempt = 0;

  while (attempt < 20) {
    target = Math.floor(Math.random() * 1000) + 1;
    solution = getValidSolution(current, target, ops, maxMoves);
    if (solution.length > 1 && solution.length <= maxMoves + 1) break;
    attempt++;
  }

  // If no valid path found, fallback to self (trivial path)
  if (solution.length === 0) {
    solution = [current];
    target = current;
  }

  return { target, current, ops, solution };
};

export default function ExponentExpress() {
  const router = useRouter();
  const [game, setGame] = useState<GameState>(getGame());
  const [current, setCurrent] = useState<number>(game.current);
  const [history, setHistory] = useState<number[]>([game.current]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [finished, setFinished] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [moves, setMoves] = useState<number>(0);

  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1 || moves >= 5) {
          clearInterval(timer);
          setFinished(true);
          if (current !== game.target) {
            setShowSolution(true);
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finished, moves]);

  const reset = () => {
    const newGame = getGame();
    setGame(newGame);
    setCurrent(newGame.current);
    setHistory([newGame.current]);
    setTimeLeft(60);
    setFinished(false);
    setShowSolution(false);
    setMoves(0);
  };

  const applyOp = (op: Operation) => {
    if (finished || moves >= 5 || current === game.target) return;
    const next = op.apply(current);
    setCurrent(next);
    setHistory((h) => [...h, next]);
    setMoves((prev) => prev + 1);

    if (next === game.target) {
      setFinished(true);
      setShowSolution(false);
    } else if (moves + 1 >= 5) {
      setFinished(true);
      setShowSolution(true);
    }
  };

  const isSuccess = current === game.target;

  return (
    <div className="min-h-screen bg-purple-100 text-gray-800 flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-black">🧮 Exponent Express</h1>
        <p className="text-gray-700">
          Start from <b className="font-bold text-brown-400">{game.current}</b> and reach 
          <b className="font-bold text-brown-600"> {game.target} </b> in <b>5 moves</b> or less using the operations below.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 text-left text-sm">
          <p className="mb-2 font-semibold text-black">Operator Info:</p>
          <ul className="list-disc list-inside text-darkgray-700">
            {game.ops.map((op, i) => (
              <li key={i}><b>{op.label}</b>: {op.desc}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {game.ops.map((op, i) => (
            <Button key={i} onClick={() => applyOp(op)} disabled={isSuccess || finished || moves >= 5} className="text-gray-800 bg-gray-300 hover:bg-gray-400">
              {op.label}
            </Button>
          ))}
        </div>

        <div className="text-lg text-gray-800 mt-4">
          Current: <span className="font-bold text-black">{current}</span>
        </div>
        <div className="text-sm text-gray-600">
          History: {history.join(" → ")}
        </div>

        <div className="mt-2 text-black">
          ⏱ Time Left: <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-brown-500'}`}>{timeLeft}s</span>
        </div>

        {isSuccess && (
          <p className="text-green-500 font-semibold mt-2">🎉 You reached the target in time! Well done!</p>
        )}
        {finished && !isSuccess && (
          <p className="text-red-500 font-semibold mt-2">
            {moves >= 5 ? "🚫 Max moves reached!" : "⏰ Time's up!"} Here's one possible solution:
          </p>
        )}

        {showSolution && (
          <p className="text-gray-800 text-sm mt-1">💡 {game.solution.join(" → ")}</p>
        )}

        <Button variant="secondary" onClick={reset} className="mt-4 text-white bg-gray-600 hover:bg-gray-700">
          🔁 New Challenge
        </Button>

        <Button onClick={() => router.back()} className="mt-4 text-white bg-purple-600 hover:bg-purple-700 absolute top-6 left-6">
          🔙 Back
        </Button>
      </div>
    </div>
  );
}
