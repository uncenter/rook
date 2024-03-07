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

function toPos(x: number, y: number) {
	return y * 8 + x;
}

function isRealMove(pos: number) {
	return pos < 64 && pos > -1;
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

	moves(board: Board) {
		let moves = [];
		const x = this.x();
		const y = this.y();
		switch (this.piece) {
			case "pawn": {
				if (this.team === "black") {
					const forwards = [toPos(x, y + 1)];
					if (y === 1) forwards.push(toPos(x, y + 2));

					for (const fwd of forwards.filter(isRealMove)) {
						if (board[fwd].team === "none") {
							moves.push(fwd);
						}
					}

					const diags = [toPos(x - 1, y + 1), toPos(x + 1, y + 1)];
					for (const diag of diags.filter(isRealMove)) {
						if (board[diag].team === "white") {
							moves.push(diag);
						}
					}
				} else if (this.team === "white") {
					const forwards = [toPos(x, y - 1)];
					if (y === 6) forwards.push(toPos(x, y - 2));

					for (const fwd of forwards.filter(isRealMove)) {
						if (board[fwd].team === "none") {
							moves.push(fwd);
						}
					}

					const diags = [toPos(x - 1, y - 1), toPos(x + 1, y - 1)];
					for (const diag of diags.filter(isRealMove)) {
						if (board[diag].team === "black") {
							moves.push(diag);
						}
					}
				}
				break;
			}
			case "king": {
				const sides = [
					toPos(x, y + 1),
					toPos(x, y - 1),
					toPos(x + 1, y),
					toPos(x - 1, y),

					toPos(x + 1, y + 1),
					toPos(x - 1, y - 1),
					toPos(x + 1, y - 1),
					toPos(x - 1, y + 1),
				];
				for (const side of sides.filter(isRealMove)) {
					moves.push(side);
				}
				break;
			}
			default: {
				moves = Array.from({ length: 64 }).map((_, idx) => idx);
			}
		}
		return moves;
	}

	y() {
		return Math.floor(this.pos / 8);
	}

	x() {
		return this.pos % 8;
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
