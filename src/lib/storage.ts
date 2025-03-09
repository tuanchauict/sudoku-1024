import type { SudokuState } from "./models";
import type { Board } from "./repository";

const CURRENT_GAME_KEY = "sudoku";

interface CurrentGame {
    initialBoard: Board;
    state: SudokuState;
    timePass: number;
}

export class GameStorage {
    static saveCurrentGame(initialBoard: Board, state: SudokuState, timePass: number) {
        const gameState = {
            initialBoard,
            state,
            timePass
        } as CurrentGame;
        localStorage.setItem(CURRENT_GAME_KEY, JSON.stringify(gameState));
    }

    static loadCurrentGame(initialBoard: Board): CurrentGame | null {
        const data = localStorage.getItem(CURRENT_GAME_KEY);
        if (!data) {
            return null;
        }

        const currentGame = JSON.parse(data) as CurrentGame;
        // Check if the initial board matches the current board
        if (JSON.stringify(currentGame.initialBoard) !== JSON.stringify(initialBoard)) {
            return null;
        }

        if (!currentGame.state) {
            return null;
        }


        return currentGame;
    }
}