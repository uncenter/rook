<script setup lang="ts">
import { ref, watch } from "vue";
import { BASE_BOARD, Board, Team, getPossibleMoves, Square } from "../lib";

const turn = ref<Team>("white");
const selected = ref<undefined | Square>(undefined);
const board = ref<Board>(BASE_BOARD);

function reset() {
	turn.value = "white";
	selected.value = undefined;
	board.value = BASE_BOARD;
}

const hints = ref<undefined | number[]>(undefined);

watch(selected, (n, o) => {
	if (n === o) return;
	if (selected.value)
		hints.value = getPossibleMoves(selected.value, board.value);
});
</script>

<template>
	<p>Turn: {{ turn }}</p>
	<div class="board">
		<div
			v-for="sq in board"
			:class="
				'row-' + (Math.floor(sq.pos / 8) % 2 === 0 ? 'even' : 'odd') + ' square'
			"
			:selected="selected && selected.pos === sq.pos"
			:team="sq.team"
			:piece="sq.piece"
			@click="
				() => {
					if (sq.team !== turn) return;
					if (selected && selected.pos === sq.pos) {
						selected = undefined;
					} else {
						selected = sq;
					}
				}
			"
		>
			<div
				v-if="selected && hints?.find((pos) => pos == sq.pos)"
				class="hint"
				@click="
					() => {
						if (!selected || !selected.pos) return;
						board[sq.pos] = board[selected.pos];
						board[selected.pos].piece = 'none';
						board[selected.pos].team = 'none';
						selected = undefined;
						turn = turn === 'white' ? 'black' : 'white';
					}
				"
			>
				<div></div>
			</div>
		</div>
	</div>
	<button @click="reset">Reset</button>
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
.square:not(.square[team="none"]) {
	background-position: 50%;
}
.square[team="black"][piece="pawn"] {
	background-image: url("/pieces/black/pawn.svg");
}
.square[team="white"][piece="pawn"] {
	background-image: url("/pieces/white/pawn.svg");
}
.square[team="black"][piece="knight"] {
	background-image: url("/pieces/black/knight.svg");
}
.square[team="white"][piece="knight"] {
	background-image: url("/pieces/white/knight.svg");
}
.square[team="black"][piece="bishop"] {
	background-image: url("/pieces/black/bishop.svg");
}
.square[team="white"][piece="bishop"] {
	background-image: url("/pieces/white/bishop.svg");
}
.square[team="black"][piece="rook"] {
	background-image: url("/pieces/black/rook.svg");
}
.square[team="white"][piece="rook"] {
	background-image: url("/pieces/white/rook.svg");
}
.square[team="black"][piece="queen"] {
	background-image: url("/pieces/black/queen.svg");
}
.square[team="white"][piece="queen"] {
	background-image: url("/pieces/white/queen.svg");
}
.square[team="black"][piece="king"] {
	background-image: url("/pieces/black/king.svg");
}
.square[team="white"][piece="king"] {
	background-image: url("/pieces/white/king.svg");
}
.row-even.square:nth-child(odd) {
	background-color: var(--light);
}
.row-odd.square:nth-child(even) {
	background-color: var(--light);
}
.square[selected="true"] {
	background-color: #ffc65c !important;
}
.hint {
	position: relative;
	width: 50px;
	height: 50px;
}
.hint > div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 15px;
	height: 15px;
	background-color: black;
	border-radius: 50%;
}
</style>
