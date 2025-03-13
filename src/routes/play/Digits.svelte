<script lang="ts">
	import { getSudokuViewModel } from '$lib/sudokuContext';
	import { onMount } from 'svelte';
	import NoteIcon from './icons/NoteIcon.svelte';
	import Tip from './Tip.svelte';
	import type { Digit } from '$lib/models';
	import UndoIcon from './icons/UndoIcon.svelte';

	let valueCounts: number[] = Array(10).fill(0); // 0-9, 0th index is not used

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
		const unsubValueCounts = viewModel.valueCounts.subscribe((value) => {
			valueCounts = value;
		});

		return () => {
			unsubNoteMode();
			unsubEditableCell();
			unsubCanUndo();
			unsubValueCounts();
		};
	});
</script>

<div class="container">
	<div class="digits-container">
		{#each Array(9).fill(null) as _, i (i)}
			{@const digit = i + 1}
			{@const count = valueCounts[i+1]}
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
			class="btn clear-btn"
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
        color: var(--text-button);
        background-color: var(--bg-button);
        border: 1px solid var(--border-color);
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
            color: var(--text-button-disabled);
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

        &:hover:not(.disabled) {
            background-color: var(--bg-button-hover);
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
        color: var(--text-secondary);
        width: calc(20% - 8px);
        aspect-ratio: 1;
        font-size: 1.4rem;

				&:active {
            background-color: var(--bg-clear-active);
        }

				&:hover {
            background-color: var(--bg-clear-hover);
            color: var(--color-danger);

						&:disabled {
                background-color: var(--bg-button);
                color: var(--text-button-disabled);
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
        color: var(--text-action);
        width: 100%;

        &:disabled {
            color: var(--text-action-disabled);
						cursor: auto;
        }

				&:hover:not(:disabled) {
            background-color: var(--bg-button-hover);
        }
    }

    .note-btn {
        background-color: var(--bg-note-btn);

        &:hover {
            background-color: var(--bg-note-btn-hover);
            color: var(--text-note-btn-hover);
        }

        &.active {
            background-color: var(--bg-note-btn-active);
            color: var(--text-on-primary);
            border-color: var(--color-primary);

            &:hover {
                background-color: var(--bg-note-btn-active-hover);
            }
        }
    }
</style>
