import type { PageLoad } from './$types';
import { generateBoard, parseBoard, type Level } from '$lib/repository';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = ({ url }) => {
    const levelId = url.searchParams.get('level') as Level;
    
    if (!levelId) {
        // Redirect to the home page
        throw redirect(303, '/');
    }

    const boardStr = url.searchParams.get('board');
    const parsedBoard = boardStr ? parseBoard(boardStr) : null;
    const board = parsedBoard || generateBoard(levelId);


    console.log('levelId', levelId, 'board', board);

    return { levelId, board };
};
