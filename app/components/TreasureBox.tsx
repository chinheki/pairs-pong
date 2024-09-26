import React from 'react';
import { cards, Player, PlayerName } from '../hooks/const';
import { useGame } from '../hooks/GameContext';

interface TreasureBoxProps {
    player: Player;
}

const TreasureBox: React.FC<TreasureBoxProps> = ({ player }) => {
    const itemsPerRow = 8;
    const { playerTrophies, robotTrophies } = useGame();
    const cardList = player === 'player' ? playerTrophies : robotTrophies;
    const treasureCount = player === 'player' ? playerTrophies.length : robotTrophies.length;
    const rows = Math.max(1, Math.ceil(treasureCount / itemsPerRow));

    const renderSquare = (index: number) => {
        const cardId = cardList[index];
        const card = cards.find(c => c.id === cardId)
        return (
            <div
                key={index}
                className={`w-12 h-12 border border-gray-400 flex items-center justify-center relative ${player === 'player' ? 'bg-yellow-200' : 'bg-purple-200'}`}
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

    const renderRow = (rowIndex: number) => {
        return (
            <div key={rowIndex} className="flex">
                {Array.from({ length: itemsPerRow }, (_, colIndex) => renderSquare(rowIndex * itemsPerRow + colIndex))}
            </div>
        );
    };

    return (
        <div className="inline-block border-2 border-gray-800 p-2">
            <div className="mb-2 text-center font-bold">{PlayerName[player]}的对子</div>
            {Array.from({ length: rows }, (_, rowIndex) => renderRow(rowIndex))}
        </div>
    );
};

export default TreasureBox;