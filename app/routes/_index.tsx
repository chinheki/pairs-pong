import type { MetaFunction } from "@remix-run/node";
import Game from "../Game";
import { GameProvider } from '../hooks/GameContext';
import TopBar from "../components/TopBar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to
          </h1>
        </header>
        <GameProvider>
          <TopBar />
          <Game />
        </GameProvider>
      </div>
    </div>
  );
}

