<script setup lang="ts">
import type { Board, Team, Square } from '../lib';
import {
	createEmptyRow,
	createHomeRow,
	createPawnRow,
	setBoardPositions,
} from '../lib';
import pieces from '../pieces';

const turn = ref<Team>('white');
const selected = ref<undefined | Square>(undefined);
const board = ref<Board>(
	setBoardPositions(
		[
			createHomeRow('black'),
			createPawnRow('black'),
			createEmptyRow(),
			createEmptyRow(),
			createEmptyRow(),
			createEmptyRow(),
			createPawnRow('white'),
			createHomeRow('white'),
		].flat(),
	),
);
</script>

<template>
	<div class="board">
		<div
			v-for="sq in board"
			:key="sq.pos"
			:class="
				['row-' + (sq.y() % 2 === 0 ? 'even' : 'odd'), 'square'].join(
					' ',
				)
			"
			:team="sq.team"
			:selected="selected && selected.pos === sq.pos"
			:hint="selected?.moves(board).includes(sq.pos)"
			@click="
				() => {
					if (
						!selected ||
						(selected && sq.piece !== 'none' && sq.team === turn)
					) {
						if (sq.team === turn) selected = sq;
					} else if (selected.pos === sq.pos) {
						selected = undefined;
					} else if (
						selected.moves(board).includes(sq.pos) &&
						sq.team !== selected.team
					) {
						board[sq.pos].piece = board[selected.pos].piece;
						board[sq.pos].team = board[selected.pos].team;
						board[selected.pos].piece = 'none';
						board[selected.pos].team = 'none';
						selected = undefined;
						turn = turn === 'white' ? 'black' : 'white';
						board = setBoardPositions(board.slice().reverse());
					}
				}
			"
		>
			<div
				v-if="sq.piece !== 'none'"
				v-html="pieces[sq.team][sq.piece]"
			></div>
		</div>
	</div>
</template>

<style>
.board {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 1fr);
	grid-gap: 0.3rem;
}
.square {
	width: 50px;
	height: 50px;
	background-color: var(--red);
}
.square,
.square div {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
[team='white'] svg path {
	fill: var(--white);
	stroke: var(--white);
}
[team='black'] svg path {
	fill: var(--black);
	stroke: var(--black);
}
.row-even.square:nth-child(odd) {
	background-color: var(--gray);
}
.row-odd.square:nth-child(even) {
	background-color: var(--gray);
}
.square[selected='true'] {
	background-color: var(--yellow) !important;
}
.square[hint='true'] {
	background-color: var(--blue) !important;
}
</style>
