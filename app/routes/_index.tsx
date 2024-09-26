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
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-screen w-screen flex-col items-center gap-16">
        <GameProvider>
          <TopBar />
          <Game />
        </GameProvider>
      </div>
    </div>
  );
}

