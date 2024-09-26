import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import fs from "node:fs";
import path from "node:path";
import { RemixServer, Outlet, Scripts, Meta, Links, ScrollRestoration } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { createContext, useState, useMemo, useContext, useCallback, useEffect } from "react";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const shellHtml = fs.readFileSync(
    path.join(process.cwd(), "app/index.html")
  ).toString();
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url })
  );
  const html = shellHtml.replace(
    "<!-- Remix SPA -->",
    appHtml
  );
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Scripts, {})
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
const cards = [
  { id: 1, imageUrl: "/assets/cards/1.png", name: "伊布" },
  { id: 2, imageUrl: "/assets/cards/2.png", name: "火伊布" },
  { id: 3, imageUrl: "/assets/cards/3.png", name: "水伊布" },
  { id: 4, imageUrl: "/assets/cards/4.png", name: "电伊布" },
  { id: 5, imageUrl: "/assets/cards/5.png", name: "太阳伊布" },
  { id: 6, imageUrl: "/assets/cards/6.png", name: "月伊布" },
  { id: 7, imageUrl: "/assets/cards/7.png", name: "冰伊布" },
  { id: 8, imageUrl: "/assets/cards/8.png", name: "草伊布" },
  { id: 9, imageUrl: "/assets/cards/9.png", name: "仙子伊布" }
];
const PlayerName = {
  "player": "玩家",
  "robot": "机器人"
};
function useGameSystem() {
  const drawCard = () => {
    const randomCardIndex = Math.floor(Math.random() * cards.length);
    const newCard = cards[randomCardIndex];
    return newCard;
  };
  return { drawCard };
}
const GameContext = createContext(void 0);
const GameProvider = ({ children }) => {
  const [currentPlayer, setCurrentPlayer] = useState("player");
  const [playerTrophies, setPlayerTrophies] = useState([]);
  const [robotTrophies, setRobotTrophies] = useState([]);
  const [gameMode, setGameMode] = useState("single");
  const [myCard, setMyCard] = useState(void 0);
  const [gameEnd, setGameEnd] = useState(true);
  const switchPlayer = () => {
    setCurrentPlayer((prev) => prev === "player" ? "robot" : "player");
  };
  const switchMode = () => {
    setGameMode((prev) => prev === "single" ? "double" : "single");
  };
  const addTrophy = (player, cardId) => {
    if (player === "player") {
      setPlayerTrophies((prev) => [...prev, cardId]);
    } else {
      setRobotTrophies((prev) => [...prev, cardId]);
    }
  };
  const winner = useMemo(() => {
    const playerScore = playerTrophies.reduce((sum, cardId) => sum + cardId, 0);
    const robotScore = robotTrophies.reduce((sum, cardId) => sum + cardId, 0);
    if (playerScore > robotScore) return "player";
    if (robotScore > playerScore) return "robot";
    return null;
  }, [playerTrophies, robotTrophies]);
  return /* @__PURE__ */ jsx(GameContext.Provider, { value: {
    currentPlayer,
    switchPlayer,
    addTrophy,
    playerTrophies,
    robotTrophies,
    winner,
    gameMode,
    switchMode,
    myCard,
    setMyCard,
    gameEnd,
    setGameEnd
  }, children });
};
const useGame = () => {
  const context = useContext(GameContext);
  if (context === void 0) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
const Chessboard = () => {
  const rows = 3;
  const cols = 3;
  const [buttonUsable, setButtonUsable] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const { currentPlayer, switchPlayer, addTrophy, winner, gameEnd, setGameEnd } = useGame();
  const { drawCard } = useGameSystem();
  const [lastDrawnCardInfo, setLastDrawnCardInfo] = useState({ cellId: null, player: "player" });
  const [matchedCards, setMatchedCards] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const checkForMatch = useCallback((card) => {
    const matchedCard = board.find((boardCard) => boardCard && boardCard.id === card.id && boardCard.cellId != card.cellId);
    return matchedCard == null ? void 0 : matchedCard.cellId;
  }, [board]);
  const removeMatchedCards = useCallback((card1, card2) => {
    setBoard((prevBoard) => prevBoard.map(
      (boardCard) => boardCard && (boardCard.cellId === card1 || boardCard.cellId === card2) ? null : boardCard
    ));
  }, []);
  const handleDrawCard = useCallback((e) => {
    e == null ? void 0 : e.preventDefault();
    setButtonUsable(false);
    console.log("draw card " + PlayerName[currentPlayer]);
    const availableCells = Array.from({ length: 9 }, (_, i) => i).filter((cellId) => !board.some((c) => c && c.cellId === cellId));
    if (availableCells.length === 0) {
      setGameEnd(true);
      return;
    }
    const randomCellIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCellId = availableCells[randomCellIndex];
    const newCard = drawCard();
    const newBoard = [...board];
    newBoard[selectedCellId] = { ...newCard, cellId: selectedCellId };
    setBoard(newBoard);
    setLastDrawnCardInfo({ cellId: selectedCellId, player: currentPlayer });
    setTimeout(() => {
      const matchedCardCellId = checkForMatch(newCard);
      if (matchedCardCellId !== void 0) {
        setMatchedCards({ cellId1: matchedCardCellId, cellId2: selectedCellId });
        setIsFlashing(true);
        const flashInterval = setInterval(() => {
          setIsFlashing((prev) => !prev);
        }, 100);
        setTimeout(() => {
          clearInterval(flashInterval);
          setIsFlashing(false);
          setMatchedCards(null);
          removeMatchedCards(matchedCardCellId, selectedCellId);
          addTrophy(currentPlayer, newCard.id);
          setTimeout(() => {
            switchPlayer();
          }, 1e3);
        }, 1e3);
      } else {
        switchPlayer();
      }
    }, 1e3);
  }, [addTrophy, board, checkForMatch, currentPlayer, drawCard, removeMatchedCards, setGameEnd, switchPlayer]);
  useEffect(() => {
    if (currentPlayer === "robot") {
      handleDrawCard();
    } else {
      setButtonUsable(true);
    }
  }, [currentPlayer]);
  const renderSquare = (cellId) => {
    const card = board[cellId];
    const isLastDrawnCard = card && lastDrawnCardInfo.cellId && cellId === lastDrawnCardInfo.cellId;
    const isMatchedCard = matchedCards && (cellId === matchedCards.cellId1 || cellId === matchedCards.cellId2);
    let bgColorClass = "";
    if (isMatchedCard && isFlashing) {
      bgColorClass = "bg-orange-300";
    } else if (isLastDrawnCard) {
      bgColorClass = lastDrawnCardInfo.player === "player" ? "bg-yellow-200" : "bg-purple-200";
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-24 h-24 border border-gray-400 flex items-center justify-center relative ${bgColorClass}`,
        children: card && /* @__PURE__ */ jsx(
          "img",
          {
            src: card.imageUrl,
            alt: card.name,
            className: "max-w-full max-h-full object-contain"
          }
        )
      },
      cellId
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    gameEnd ? /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "游戏结束！获胜方：",
      winner === "player" ? "玩家" : "机器人"
    ] }) : /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "当前回合: ",
      currentPlayer === "player" ? "玩家" : "机器人"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1 mb-4", children: Array.from({ length: rows * cols }, (_, index) => renderSquare(index)) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleDrawCard,
        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        disabled: gameEnd || !buttonUsable,
        children: "抽牌"
      }
    )
  ] });
};
const SingleChessboard = () => {
  const rows = 3;
  const cols = 3;
  const [chance, setChance] = useState(9);
  const [buttonUsable, setButtonUsable] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const { addTrophy, playerTrophies, myCard, gameEnd, setGameEnd } = useGame();
  const { drawCard } = useGameSystem();
  const [lastDrawnCardInfo, setLastDrawnCardInfo] = useState({ cellId: null, player: "player" });
  const [matchedCards, setMatchedCards] = useState(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const checkForMatch = useCallback((card) => {
    const matchedCard = board.find((boardCard) => boardCard && boardCard.id === card.id && boardCard.cellId != card.cellId);
    return matchedCard == null ? void 0 : matchedCard.cellId;
  }, [board]);
  const checkForMatchMyCard = useCallback((card) => {
    return myCard !== void 0 && card.id === myCard;
  }, [myCard]);
  const removeMatchedCards = useCallback((card1, card2) => {
    setBoard((prevBoard) => prevBoard.map(
      (boardCard) => boardCard && (boardCard.cellId === card1 || boardCard.cellId === card2) ? null : boardCard
    ));
  }, []);
  const handleDrawCard = useCallback((e) => {
    e == null ? void 0 : e.preventDefault();
    setButtonUsable(false);
    const availableCells = Array.from({ length: 9 }, (_, i) => i).filter((cellId) => !board.some((c) => c && c.cellId === cellId));
    if (availableCells.length === 0) {
      setGameEnd(true);
      console.error("棋盘已满，无法放置新卡片");
      return;
    }
    const randomCellIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCellId = availableCells[randomCellIndex];
    const newCard = drawCard();
    const newBoard = [...board];
    newBoard[selectedCellId] = { ...newCard, cellId: selectedCellId };
    setBoard(newBoard);
    setChance((prev) => prev - 1);
    let chanceThisTurn = chance - 1;
    setLastDrawnCardInfo({ cellId: selectedCellId, player: "player" });
    setTimeout(() => {
      const matchMyCard = checkForMatchMyCard(newCard);
      if (matchMyCard) {
        setChance((prev) => prev + 1);
        chanceThisTurn += 1;
      }
      const matchedCardCellId = checkForMatch(newCard);
      if (matchedCardCellId !== void 0) {
        setMatchedCards({ cellId1: matchedCardCellId, cellId2: selectedCellId });
        setIsFlashing(true);
        const flashInterval = setInterval(() => {
          setIsFlashing((prev) => !prev);
        }, 100);
        setTimeout(() => {
          clearInterval(flashInterval);
          setIsFlashing(false);
          setMatchedCards(null);
          removeMatchedCards(matchedCardCellId, selectedCellId);
          addTrophy("player", newCard.id);
          setChance((prev) => prev + 1);
          setButtonUsable(true);
        }, 1e3);
      } else {
        if (chanceThisTurn === 0) {
          setGameEnd(true);
        }
        setButtonUsable(true);
      }
    }, 1e3);
  }, [addTrophy, board, chance, checkForMatch, checkForMatchMyCard, drawCard, removeMatchedCards]);
  const renderSquare = (cellId) => {
    const card = board[cellId];
    const isLastDrawnCard = card && lastDrawnCardInfo.cellId && cellId === lastDrawnCardInfo.cellId;
    const isMatchedCard = matchedCards && (cellId === matchedCards.cellId1 || cellId === matchedCards.cellId2);
    let bgColorClass = "";
    if (isMatchedCard && isFlashing) {
      bgColorClass = "bg-orange-300";
    } else if (isLastDrawnCard) {
      bgColorClass = "bg-yellow-200";
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-24 h-24 border border-gray-400 flex items-center justify-center relative ${bgColorClass}`,
        children: card && /* @__PURE__ */ jsx(
          "img",
          {
            src: card.imageUrl,
            alt: card.name,
            className: "max-w-full max-h-full object-contain"
          }
        )
      },
      cellId
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    gameEnd ? /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "最终结果：",
      playerTrophies.length,
      "个碰"
    ] }) : /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
      "当前",
      playerTrophies.length,
      "个碰，还有",
      chance,
      "次抽卡机会"
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1 mb-4", children: Array.from({ length: rows * cols }, (_, index) => renderSquare(index)) }),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleDrawCard,
        className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        disabled: gameEnd || !buttonUsable,
        children: "抽牌"
      }
    )
  ] });
};
const TreasureBox = ({ player }) => {
  const itemsPerRow = 8;
  const { playerTrophies, robotTrophies } = useGame();
  const cardList = player === "player" ? playerTrophies : robotTrophies;
  const treasureCount = player === "player" ? playerTrophies.length : robotTrophies.length;
  const rows = Math.max(1, Math.ceil(treasureCount / itemsPerRow));
  const renderSquare = (index) => {
    const cardId = cardList[index];
    const card = cards.find((c) => c.id === cardId);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-12 h-12 border border-gray-400 flex items-center justify-center relative ${player === "player" ? "bg-yellow-200" : "bg-purple-200"}`,
        children: card && /* @__PURE__ */ jsx(
          "img",
          {
            src: card.imageUrl,
            alt: card.name,
            className: "max-w-full max-h-full object-contain"
          }
        )
      },
      index
    );
  };
  const renderRow = (rowIndex) => {
    return /* @__PURE__ */ jsx("div", { className: "flex", children: Array.from({ length: itemsPerRow }, (_, colIndex) => renderSquare(rowIndex * itemsPerRow + colIndex)) }, rowIndex);
  };
  return /* @__PURE__ */ jsxs("div", { className: "inline-block border-2 border-gray-800 p-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-2 text-center font-bold", children: [
      PlayerName[player],
      "的对子"
    ] }),
    Array.from({ length: rows }, (_, rowIndex) => renderRow(rowIndex))
  ] });
};
function Game() {
  const { gameMode } = useGame();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    gameMode === "single" ? null : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-700 dark:text-gray-200", children: "对手" }),
      /* @__PURE__ */ jsx(TreasureBox, { player: "robot" })
    ] }),
    gameMode === "single" ? /* @__PURE__ */ jsx(SingleChessboard, {}) : /* @__PURE__ */ jsx(Chessboard, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsx(TreasureBox, { player: "player" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-gray-700 dark:text-gray-200", children: "玩家" })
    ] })
  ] });
}
const TopBar = () => {
  const { gameMode, switchMode, setMyCard, gameEnd, setGameEnd } = useGame();
  const [useMyCard, setUseMyCard] = useState(false);
  const [myCardId, setMyCardId] = useState(1);
  useEffect(() => {
    if (!useMyCard) {
      setMyCard(void 0);
    } else {
      setMyCard(myCardId);
    }
  }, [myCardId, useMyCard]);
  return /* @__PURE__ */ jsx("div", { className: "w-full bg-yellow-100 p-5", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex justify-center items-center gap-5", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold", children: "对对碰" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-5", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => switchMode(),
          disabled: gameMode === "single",
          className: `${gameMode === "single" ? "bg-blue-500 text-white" : "bg-white text-blue-500"} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`,
          children: "单人对对碰"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => switchMode(),
          disabled: gameMode === "double",
          className: `${gameMode === "double" ? "bg-blue-500 text-white" : "bg-white text-blue-500"} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`,
          children: "人机对战"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: useMyCard,
          onChange: () => setUseMyCard((prev) => !prev)
        }
      ),
      "押宝模式",
      /* @__PURE__ */ jsxs(
        "select",
        {
          onChange: (e) => setMyCardId(Number(e.target.value)),
          className: "ml-2 p-2 border rounded",
          value: myCardId,
          disabled: !useMyCard || !gameEnd,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "选择卡片" }),
            cards.map((card) => /* @__PURE__ */ jsxs("option", { value: card.id, children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: card.imageUrl,
                  alt: card.name,
                  className: "w-12 h-12 inline-block mr-2"
                }
              ),
              card.name
            ] }, card.id))
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setGameEnd(false),
          disabled: !gameEnd,
          className: `${gameEnd ? "bg-blue-500 text-white" : "bg-white text-blue-500"} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`,
          children: "开始游戏"
        }
      )
    ] })
  ] }) });
};
const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-screen w-screen items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex h-screen w-screen flex-col items-center gap-16", children: /* @__PURE__ */ jsxs(GameProvider, { children: [
    /* @__PURE__ */ jsx(TopBar, {}),
    /* @__PURE__ */ jsx(Game, {})
  ] }) }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BsbDqWbO.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Ciyp1X6x.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CJe1lhXM.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-Ciyp1X6x.js"], "css": ["/assets/root-B2vU1Sx1.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BnjcWdCy.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-3e975bf3.js", "version": "3e975bf3" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "unstable_singleFetch": false, "unstable_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
