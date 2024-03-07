export type Piece =
	| "pawn"
	| "knight"
	| "bishop"
	| "rook"
	| "queen"
	| "king"
	| "none";
export type Team = "white" | "black" | "none";

export type Board = Square[];

export class _Square {
	public piece: Piece;
	public team: Team;
	public pos?: number;

	constructor(piece: Piece, team: Team) {
		this.piece = piece;
		this.team = team;
	}
}

export class Square {
	public piece: Piece;
	public team: Team;
	public pos: number;

	constructor(piece: Piece, team: Team, pos: number) {
		this.piece = piece;
		this.team = team;
		this.pos = pos;
	}
}

export const EMPTC_ROW = new Array(8).fill(new _Square("none", "none"));

export const PAWN_ROW = (team: Team) =>
	new Array(8).fill(new _Square("pawn", team));
export const HOME_ROW = (team: Team) =>
	(
		[
			"rook",
			"knight",
			"bishop",
			"queen",
			"king",
			"bishop",
			"knight",
			"rook",
		] as Piece[]
	).map((piece) => new _Square(piece, team));

export const BASE_BOARD = [
	HOME_ROW("black"),
	PAWN_ROW("black"),
	EMPTC_ROW,
	EMPTC_ROW,
	EMPTC_ROW,
	EMPTC_ROW,
	PAWN_ROW("white"),
	HOME_ROW("white"),
]
	.flat()
	.map((sq: _Square, idx) => new Square(sq.piece, sq.team, idx)) as Board;

export function getPossibleMoves(square: Square, board: Board): number[] {
	const moves: number[] = [];

	moves.push(53);

	return moves;
}
