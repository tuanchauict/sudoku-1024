import { base } from '$app/paths';

export function appUrl(path: string) {
	return `${base}${path}`;
}