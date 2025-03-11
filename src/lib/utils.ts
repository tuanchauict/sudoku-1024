import type { Readable } from 'svelte/store';

export function equals(a: unknown, b: unknown): boolean {
	return JSON.stringify(a) === JSON.stringify(b);
}

export function getDerivedValue<T>(store: Readable<T>): T {
	let value: T;
	const unsubscribe = store.subscribe((v) => {
		value = v;
	});
	unsubscribe();
	return value!;
}
