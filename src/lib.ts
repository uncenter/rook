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

export class Square {
	public piece: Piece;
	public team: Team;
	public pos: number;

	constructor(piece: Piece, team: Team, pos: number) {
		this.piece = piece;
		this.team = team;
		this.pos = pos;
	}

	moves() {
		return Array.from({ length: 64 }).map((_, idx) => idx);
	}

	up() {
		if (this.pos < 8) return undefined;
		return this.pos - 8;
	}

	down() {
		if (this.pos > 64 - 8) return undefined;
		return this.pos + 8;
	}
}

export const EMPTY_ROW = () =>
	Array.from({ length: 8 }, (_, i) => new Square("none", "none", i));
export const PAWN_ROW = (team: Team) =>
	Array.from({ length: 8 }, () => new Square("pawn", team, -1));
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
	).map((piece) => new Square(piece, team, -1));

export const BASE_BOARD = [
	HOME_ROW("black"),
	PAWN_ROW("black"),
	EMPTY_ROW(),
	EMPTY_ROW(),
	EMPTY_ROW(),
	EMPTY_ROW(),
	PAWN_ROW("white"),
	HOME_ROW("white"),
]
	.flat()
	.map((sq: Square, idx) => {
		sq.pos = idx;
		return sq;
	}) as Board;
