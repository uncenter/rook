<script setup lang="ts">
import { ref, watch } from "vue";
import {
	BASE_BOARD,
	Board,
	Piece,
	Position,
	Side,
	getPossibleMoves,
} from "../lib";

const turn = ref<Side>(Side.White);
const selected = ref<undefined | Position>(undefined);
const board = ref<Board>(BASE_BOARD);

const possibleMoves = ref<undefined | Position[]>(undefined);

watch(selected, () => {
	if (selected.value)
		possibleMoves.value = getPossibleMoves(selected.value, board.value);
	console.log({ possibleMoves });
});
</script>

<template>
	<p>Turn: {{ turn }}</p>
	<div class="board">
		<div class="row" v-for="(row, rIdx) in board">
			<div
				class="square"
				v-for="(col, cIdx) in row"
				:selected="selected && selected[0] === rIdx && selected[1] === cIdx"
			>
				<img
					v-if="col[0] !== Piece.None"
					:src="
						'/pieces/' +
						Side[col[1]].toLowerCase() +
						'/' +
						Piece[col[0]].toLowerCase() +
						'.svg'
					"
					class="piece"
					@click="
						() => {
							if (selected && selected[0] === rIdx && selected[1] == cIdx) {
								selected = undefined;
							} else {
								selected = [rIdx, cIdx] as Position
							}
						}
					"
				/>
				<div
					v-if="
						selected &&
						possibleMoves?.find(([r, c]) => r === rIdx && c === cIdx)
					"
					class="possible"
				>
					<div class="circle"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.board {
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
	--light: #adadad;
	--dark: #8e3b46;
}
.row {
	display: flex;
	flex-direction: row;
	gap: 0.3rem;
}
.square {
	width: 50px;
	height: 50px;
	--square-bg: var(--dark);
	background-color: var(--square-bg);
}
.row:nth-of-type(odd) .square:nth-of-type(odd),
.row:nth-of-type(even) .square:nth-of-type(even) {
	--square-bg: var(--light);
}
.piece {
	width: -webkit-fill-available;
	height: -webkit-fill-available;
}
.square[selected="true"] {
	background-color: #ffc65c !important;
}
.possible {
	position: relative;
	width: 50px;
	height: 50px;
}
.possible .circle {
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
