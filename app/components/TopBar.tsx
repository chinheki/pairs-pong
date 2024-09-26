import React, { useEffect, useState } from 'react';
import { useGame } from '../hooks/GameContext';
import { cards } from '../hooks/const';

const TopBar: React.FC = () => {
    const { gameMode, switchMode, setMyCard, gameEnd, setGameEnd } = useGame();
    const [useMyCard, setUseMyCard] = useState(false)
    const [myCardId, setMyCardId] = useState(1)
    useEffect(() => {
        if (!useMyCard) {
            setMyCard(undefined)
        } else {
            setMyCard(myCardId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myCardId, useMyCard])
    return (
        <div className="w-full bg-yellow-100 p-5">
            <div className="container mx-auto flex justify-center items-center gap-5">
                <h1 className="text-xl font-bold">记忆配对游戏</h1>
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => switchMode()}
                        disabled={gameMode === 'single'}
                        className={`${gameMode === 'single' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`}
                    >
                        单人对对碰
                    </button>
                    <button
                        onClick={() => switchMode()}
                        disabled={gameMode === 'double'}
                        className={`${gameMode === 'double' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`}
                    >
                        人机对战
                    </button>
                    <input
                        type="checkbox"
                        checked={useMyCard}
                        onChange={() => setUseMyCard(prev => !prev)}
                    />
                    押宝模式
                    <select
                        onChange={(e) => setMyCardId(Number(e.target.value))}
                        className="ml-2 p-2 border rounded"
                        value={myCardId}
                        disabled={!useMyCard || !gameEnd}
                    >
                        <option value="">选择卡片</option>
                        {cards.map((card) => (
                            <option key={card.id} value={card.id}>
                                <img
                                    src={card.imageUrl}
                                    alt={card.name}
                                    className="w-12 h-12 inline-block mr-2"
                                />
                                {card.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => setGameEnd(false)}
                        disabled={!gameEnd}
                        className={`${gameEnd ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded`}
                    >
                        开始游戏
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
