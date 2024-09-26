import Chessboard from './components/Chessboard';
import SingleChessboard from './components/SingleChessboard';
import TreasureBox from './components/TreasureBox';
import { useGame } from './hooks/GameContext';

function Game() {
    const { gameMode } = useGame();

    return (
        <>{gameMode === 'single' ? null : <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                对手
            </h2>
            <TreasureBox player={'robot'} />
        </div>}{
                gameMode === 'single' ? <SingleChessboard /> :
                    <Chessboard />}<div className="flex flex-col items-center gap-4">
                <TreasureBox player={'player'} />
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                    玩家
                </h2>
            </div></>
    );
}

export default Game;