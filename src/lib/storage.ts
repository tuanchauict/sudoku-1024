import type { Board, SudokuState } from './models';
import { encodeToBASE64URL } from '$lib/encoder';

const GAME_PREFIX = 'sudoku';

interface CurrentGame {
	state: SudokuState;
	timePass: number;
}

export class GameStorage {
	static saveCurrentGame(initialBoard: Board, state: SudokuState, timePass: number) {
		const gameState = {
			state,
			timePass
		} as CurrentGame;
		localStorage.setItem(key(initialBoard), JSON.stringify(gameState));
	}

	static loadCurrentGame(initialBoard: Board): CurrentGame | null {
		const data = localStorage.getItem(key(initialBoard));
		if (!data) {
			return null;
		}

		const currentGame = JSON.parse(data) as CurrentGame;
		if (!currentGame.state) {
			return null;
		}

		return currentGame;
	}
}

function key(initialBoard: Board) {
	const bytes = initialBoard.flatMap((row) => row);
	return `${GAME_PREFIX}_${encodeToBASE64URL(bytes)}`;
}
