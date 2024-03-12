<script setup lang="ts">
import type { Board, Team, Square } from '../lib';
import {
	createEmptyRow,
	createHomeRow,
	createPawnRow,
	setBoardPositions,
} from '../lib';

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
			:selected="selected && selected.pos === sq.pos"
			:team="sq.team"
			:piece="sq.piece"
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
		></div>
	</div>
</template>

<style>
.board {
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 1fr);
	grid-gap: 0.3rem;
	--light: #adadad;
	--dark: #8e3b46;
}
.square {
	width: 50px;
	height: 50px;
	background-color: var(--dark);
}
.square:not(.square[team='none']) {
	background-position: 50%;
}
.square[team='black'][piece='pawn'] {
	background-image: url('/pieces/black/pawn.svg');
}
.square[team='white'][piece='pawn'] {
	background-image: url('/pieces/white/pawn.svg');
}
.square[team='black'][piece='knight'] {
	background-image: url('/pieces/black/knight.svg');
}
.square[team='white'][piece='knight'] {
	background-image: url('/pieces/white/knight.svg');
}
.square[team='black'][piece='bishop'] {
	background-image: url('/pieces/black/bishop.svg');
}
.square[team='white'][piece='bishop'] {
	background-image: url('/pieces/white/bishop.svg');
}
.square[team='black'][piece='rook'] {
	background-image: url('/pieces/black/rook.svg');
}
.square[team='white'][piece='rook'] {
	background-image: url('/pieces/white/rook.svg');
}
.square[team='black'][piece='queen'] {
	background-image: url('/pieces/black/queen.svg');
}
.square[team='white'][piece='queen'] {
	background-image: url('/pieces/white/queen.svg');
}
.square[team='black'][piece='king'] {
	background-image: url('/pieces/black/king.svg');
}
.square[team='white'][piece='king'] {
	background-image: url('/pieces/white/king.svg');
}
.row-even.square:nth-child(odd) {
	background-color: var(--light);
}
.row-odd.square:nth-child(even) {
	background-color: var(--light);
}
.square[selected='true'] {
	background-color: #ffc65c !important;
}
.square[hint='true'] {
	background-color: #a6e1fa !important;
}
</style>
