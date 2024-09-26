import React, { useState, useCallback } from 'react';
import { useGameSystem } from '../hooks/useGameSystem';
import { Card } from '../hooks/type';
import { useGame } from '../hooks/GameContext';

interface LastDrawnCardInfo {
    cellId: number | null;
    player: 'player' | 'robot';
}

interface MatchedCards {
    cellId1: number;
    cellId2: number;
}

const SingleChessboard: React.FC = () => {
    const rows = 3;
    const cols = 3;
    const [chance, setChance] = useState(9)
    const [buttonUsable, setButtonUsable] = useState(true);
    const [board, setBoard] = useState<(Card | null)[]>(Array(9).fill(null));
    const { addTrophy, playerTrophies, myCard, gameEnd, setGameEnd } = useGame();
    const { drawCard } = useGameSystem();
    const [lastDrawnCardInfo, setLastDrawnCardInfo] = useState<LastDrawnCardInfo>({ cellId: null, player: 'player' });
    const [matchedCards, setMatchedCards] = useState<MatchedCards | null>(null);
    const [isFlashing, setIsFlashing] = useState(false);

    const checkForMatch = useCallback((card: Card): number | undefined => {
        const matchedCard = board.find(boardCard => boardCard && boardCard.id === card.id && boardCard.cellId != card.cellId);
        return matchedCard?.cellId;
    }, [board]);
    const checkForMatchMyCard = useCallback((card: Card): boolean => {
        return myCard !== undefined && card.id === myCard;
    }, [myCard]);
    const removeMatchedCards = useCallback((card1: number, card2: number) => {
        setBoard(prevBoard => prevBoard.map(boardCard =>
            (boardCard && (boardCard.cellId === card1 || boardCard.cellId === card2)) ? null : boardCard
        ));
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleDrawCard = useCallback((e?: any) => {
        e?.preventDefault();
        setButtonUsable(false)
        // 获取所有未被占用的格子
        const availableCells = Array.from({ length: 9 }, (_, i) => i)
            .filter(cellId => !board.some(c => c && c.cellId === cellId));

        if (availableCells.length === 0) {
            setGameEnd(true)
            console.error('棋盘已满，无法放置新卡片');
            return;
        }
        // 随机选择一个未被占用的格子
        const randomCellIndex = Math.floor(Math.random() * availableCells.length);
        const selectedCellId = availableCells[randomCellIndex];
        const newCard = drawCard();

        // 更新棋盘状态
        const newBoard = [...board];
        newBoard[selectedCellId] = { ...newCard, cellId: selectedCellId };
        setBoard(newBoard);
        setChance(prev => prev - 1)
        let chanceThisTurn = chance - 1
        // 更新最后抽取的卡片信息
        setLastDrawnCardInfo({ cellId: selectedCellId, player: 'player' })

        setTimeout(() => {
            const matchMyCard = checkForMatchMyCard(newCard)
            if (matchMyCard) {
                setChance(prev => prev + 1)
                chanceThisTurn += 1;
            }
            // 检查是否有匹配
            const matchedCardCellId = checkForMatch(newCard);
            if (matchedCardCellId !== undefined) {
                // 如果有匹配，处理匹配逻辑
                setMatchedCards({ cellId1: matchedCardCellId, cellId2: selectedCellId });
                setIsFlashing(true);

                // 闪烁效果
                const flashInterval = setInterval(() => {
                    setIsFlashing(prev => !prev);
                }, 100); // 每300毫秒切换一次

                // 三秒后停止闪烁
                setTimeout(() => {
                    clearInterval(flashInterval);
                    setIsFlashing(false);
                    setMatchedCards(null);
                    removeMatchedCards(matchedCardCellId, selectedCellId);
                    addTrophy('player', newCard.id);
                    setChance(prev => prev + 1)
                    setButtonUsable(true)
                }, 1000);
            } else {
                if (chanceThisTurn === 0) {
                    setGameEnd(true)
                }
                // 如果没有匹配，切换玩家
                setButtonUsable(true)
            }
        }, 1000)
    }, [addTrophy, board, chance, checkForMatch, checkForMatchMyCard, drawCard, removeMatchedCards]);


    const renderSquare = (cellId: number) => {
        const card = board[cellId];
        const isLastDrawnCard = card && lastDrawnCardInfo.cellId && cellId === lastDrawnCardInfo.cellId;
        const isMatchedCard = matchedCards && (cellId === matchedCards.cellId1 || cellId === matchedCards.cellId2);

        let bgColorClass = '';
        if (isMatchedCard && isFlashing) {
            bgColorClass = 'bg-orange-300';
        } else if (isLastDrawnCard) {
            bgColorClass = 'bg-yellow-200';
        }

        return (
            <div
                key={cellId}
                className={`w-24 h-24 border border-gray-400 flex items-center justify-center relative ${bgColorClass}`}
            >
                {card && (
                    <img
                        src={card.imageUrl}
                        alt={card.name}
                        className="max-w-full max-h-full object-contain"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center">
            {gameEnd ?
                <p className="mt-4">最终结果：{playerTrophies.length}个碰</p>
                :
                <p className="mt-4">当前{playerTrophies.length}个碰，还有{chance}次抽卡机会</p>}
            <div className="grid grid-cols-3 gap-1 mb-4">
                {Array.from({ length: rows * cols }, (_, index) => renderSquare(index))}
            </div>
            <button
                onClick={handleDrawCard}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={gameEnd || !buttonUsable}
            >
                抽牌
            </button>
        </div>
    );
};

export default SingleChessboard;