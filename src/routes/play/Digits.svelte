<script lang="ts">
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	import NoteIcon from './icons/NoteIcon.svelte';
	import Tip from './Tip.svelte';
	import type { Digit } from '$lib/models';
	import UndoIcon from './icons/UndoIcon.svelte';

	export let digitCounts: number[] = Array(9).fill(0);

	let noteMode = false;
	let isClearable = true;
	let canUndo = false;

	const viewModel = getSudokuViewModel();

	function handleDigitClick(digit: number) {
		viewModel.enterDigit(digit as Digit);
	}

	onMount(() => {
		const unsubNoteMode = viewModel.noteMode.subscribe((value) => {
			noteMode = value;
		});
		const unsubEditableCell = viewModel.cellEditable.subscribe((value) => {
			isClearable = value;
		});
		const unsubCanUndo = viewModel.canUndo.subscribe((value) => {
			canUndo = value;
		});

		return () => {
			unsubNoteMode();
			unsubEditableCell();
			unsubCanUndo();
		};
	});
</script>

<div class="container">
	<div class="digits-container">
		{#each Array(9).fill(null) as _, i (i)}
			{@const digit = i + 1}
			{@const count = digitCounts[i]}
			<button
				class="btn digit-button"
				class:disabled={count >= 9}
				on:click={() => handleDigitClick(digit)}
				disabled={count >= 9}
			>
				{digit}
			</button>
		{/each}

		<button
			class="btn digit-button clear-btn"
			disabled={!isClearable}
			on:click={() => viewModel.clearSelectedCell()}
		>
			<span>&#10005;</span>
		</button>
	</div>

	<div class="actions-container">
		<button class="btn action-button" disabled={!canUndo} on:click={() => viewModel.undo()}>
			<UndoIcon />
			<span>Undo</span>
		</button>
		<button class="btn action-button note-btn" class:active={noteMode} on:click={() => viewModel.toggleNoteMode()}>
			<NoteIcon />
			<span>Note</span>
		</button>
	</div>

	<Tip />
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 300px;
    }

    .digits-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        margin: 8px 0;
        width: 100%;
        max-width: 300px;
    }

		.btn {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: monospace;
        color: black;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;

        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        user-select: none;
        -webkit-appearance: none;
        appearance: none;
        touch-action: manipulation;

        &:active {
            transition: background-color 0.1s;
        }

        &:disabled {
            opacity: 0.5;
            color: #999;
        }

				&:hover:not(.disabled) {
            background-color: #e0e0e0;
        }
		}

    .digit-button {
        width: calc(20% - 8px);
        aspect-ratio: 1;
        font-size: 1.4rem;
        position: relative;

				&:active {
            transition: background-color 0.1s;
				}

				&:disabled {
						cursor: not-allowed;
				}
    }

    @media (min-width: 768px) {
        .digits-container {
            gap: 10px;
        }

        .digit-button {
            width: calc(20% - 10px);
            font-size: 20px;
        }
    }

    .clear-btn {
        color: #4b5563;
        font-size: 1.4rem;

				&:active {
            background-color: #fecaca;
        }

				&:hover {
            background-color: #fee2e2;
            color: #ef4444;

						&:disabled {
								background-color: #f3f4f6;
								color: #999;
            }
				}

				&:disabled {
						opacity: 0.5;
						cursor: not-allowed;
				}
    }

    .actions-container {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin: 8px 4px;
        width: 100%;
    }

    .action-button {
        flex-direction: row;
        padding: 12px 24px;
        gap: 8px;
        font-size: 1rem;
        transition: all 0.2s;
        color: #4b5563;
        width: 100%;

        &:disabled {
            color: #999;
						cursor: auto;
        }
    }

    .note-btn {
        background-color: #f3f4f6;

        &:hover {
            background-color: #dbeafe;
            color: #3b82f6;
        }

        &.active {
            background-color: #3b82f6;
            color: white;
						border-color: #3b82f6;

            &:hover {
                background-color: #2563eb;
            }
        }
    }
</style>
