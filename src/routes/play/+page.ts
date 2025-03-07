import type { PageLoad } from './$types';
import type { Level } from '$lib/repository';

export const load: PageLoad = ({ url }) => {
    const levelId = url.searchParams.get('level') as Level;
    console.log(levelId); 
    return { levelId };
};
