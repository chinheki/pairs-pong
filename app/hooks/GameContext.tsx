import React, { createContext, useContext, useMemo, useState } from 'react';
import { Mode, Player } from './const';

interface GameContextType {
    currentPlayer: Player;
    switchPlayer: () => void;
    addTrophy: (player: Player, cardId: number) => void;
    playerTrophies: number[];
    robotTrophies: number[];
    winner: Player | null;
    gameMode: Mode;
    switchMode: () => void;
    myCard?: number;
    setMyCard: (cardId?: number) => void;
    gameEnd: boolean;
    setGameEnd: (end: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentPlayer, setCurrentPlayer] = useState<Player>('player');
    const [playerTrophies, setPlayerTrophies] = useState<number[]>([]);
    const [robotTrophies, setRobotTrophies] = useState<number[]>([]);
    const [gameMode, setGameMode] = useState<Mode>('single');
    const [myCard, setMyCard] = useState<number | undefined>(undefined);
    const [gameEnd, setGameEnd] = useState(true);

    const switchPlayer = () => {
        setCurrentPlayer(prev => prev === 'player' ? 'robot' : 'player');
    };
    const switchMode = () => {
        setGameMode(prev => prev === 'single' ? 'double' : 'single');
    };
    const addTrophy = (player: Player, cardId: number) => {
        if (player === 'player') {
            setPlayerTrophies(prev => [...prev, cardId]);
        } else {
            setRobotTrophies(prev => [...prev, cardId]);
        }
    };

    const winner = useMemo(() => {
        const playerScore = playerTrophies.reduce((sum, cardId) => sum + cardId, 0);
        const robotScore = robotTrophies.reduce((sum, cardId) => sum + cardId, 0);

        if (playerScore > robotScore) return 'player';
        if (robotScore > playerScore) return 'robot';
        return null; // 平局
    }, [playerTrophies, robotTrophies]);

    return (
        <GameContext.Provider value={{
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
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};