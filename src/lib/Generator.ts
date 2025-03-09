import QQWing from 'qqwing';
import { encodeToBASE64URL } from '$lib/encoder';

export type Level = 'Easy' | 'Medium' | 'Hard' | 'Diabolic';

const LEVEL_MAPPER = ['Unknown', 'Easy', 'Medium', 'Hard', 'Diabolic'];

const POOL = {
	Unknown: [] as string[],
	Easy: [] as string[],
	Medium: [] as string[],
	Hard: [] as string[],
	Diabolic: [] as string[]
};

class Generator {
	private qq = new QQWing();

	constructor() {
		this.qq.setPrintStyle(0);
		this.qq.setRecordHistory(true);
	}

	generateBoardString(level: Level): string {
		if (POOL[level].length > 0) {
			return POOL[level].pop()!;
		}
		let count = 0;
		const levelPool = POOL[level];

		while (levelPool.length < 10) {
			const [level, puzzle] = this.generatePuzzle();
			if (POOL[level].length < 100) {
				POOL[level].push(puzzle);
			}
			count += 1;
			if (count > 300) {
				break;
			}
		}
		return levelPool.pop()!;
	}

	private generatePuzzle(): [Level, string] {
		this.qq.generatePuzzleSymmetry(5);
		const puzzle = this.qq.getPuzzleString();
		this.qq.solve();
		const difficulty = this.qq.getDifficulty();
		const level = LEVEL_MAPPER[difficulty] as Level;

		return [level, this.standardizePuzzle(puzzle.trim())];
	}

	private standardizePuzzle(puzzle: string): string {
		const mapper = '.123456789';
		const bytes: number[] = [];
		for (const char of puzzle) {
			let index = mapper.indexOf(char);
			if (index === -1) {
				index = 0;
			}
			bytes.push(index);
		}
		return encodeToBASE64URL(bytes);
	}

	prepare() {
		for (let i = 0; i < 4; i++) {
			const [level, puzzle] = this.generatePuzzle();
			if (POOL[level].length < 100) {
				POOL[level].push(puzzle);
			}
		}
	}
}

export const generator = new Generator();

generator.prepare();
setInterval(() => {
	if (
		POOL.Easy.length < 10 ||
		POOL.Medium.length < 10 ||
		POOL.Hard.length < 10 ||
		POOL.Diabolic.length < 10
	) {
		generator.prepare();
	}
}, 1000);