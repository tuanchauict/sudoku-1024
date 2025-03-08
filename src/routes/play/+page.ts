import type { PageLoad } from './$types';
import { generateBoard, parseBoard, type Level } from '$lib/repository';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = ({ url }) => {
    const levelId = url.searchParams.get('level') as Level;
    
    if (!levelId) {
        // Redirect to the home page
        throw redirect(303, '/');
    }

    let boardStr = url.searchParams.get('board');
    const parsedBoard = boardStr ? parseBoard(boardStr) : null;
    if (!parsedBoard) {
        boardStr = generateBoard(levelId);

        // Redirect to the same page with the generated board
        throw redirect(303, `play?level=${levelId}&board=${boardStr}`);
    }

    return { levelId, board: parsedBoard };
};
