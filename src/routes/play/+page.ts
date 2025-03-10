import type { PageLoad } from './$types';
import { parseBoard } from '$lib/parser';
import { redirect } from '@sveltejs/kit';
import { generator } from '$lib/Generator';
import type { Level } from '$lib/models';

export const load: PageLoad = ({ url }) => {
    const game = url.searchParams.get('game');
    if (!game) {
        // Redirect to the home page
        throw redirect(303, '/');
    }

    const levelCode = parseInt(game[0]);
    if (isNaN(levelCode) || levelCode < 1 || levelCode > 4) {
        // Redirect to the home page
        throw redirect(303, '/');
    }

    const levelId = levelCode as Level;
    
    if (!levelId) {
        // Redirect to the home page
        throw redirect(303, '/');
    }

    let boardStr = game.substring(1);
    const parsedBoard = boardStr ? parseBoard(boardStr) : null;
    if (!parsedBoard) {
        boardStr = generator.generateBoardString(levelId);

        // Redirect to the same page with the generated board
        throw redirect(303, `play?game=${levelCode}${boardStr}`);
    }

    return { levelId, board: parsedBoard };
};
