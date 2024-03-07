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

function toPos([x, y]: number[]) {
	return y * 8 + x;
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
		let moves: number[][] = [];

		const x = this.x();
		const y = this.y();

		const isRealMove = (pos: number) => {
			return board[pos].team !== this.team;
		};

		const isRealCoord = ([x, y]: number[]) => {
			return x < 8 && x > -1 && y < 8 && y > -1;
		};

		if (this.piece === "pawn") {
			if (this.team === "black") {
				const forwards = [[x, y + 1]];
				if (y === 1) forwards.push([x, y + 2]);

				for (const fwd of forwards) {
					if (isRealCoord(fwd) && board[toPos(fwd)].team === "none") {
						moves.push(fwd);
					}
				}

				const diags = [
					[x - 1, y + 1],
					[x + 1, y + 1],
				];
				for (const diag of diags) {
					if (
						isRealCoord(diag) &&
						!["none", this.team].includes(board[toPos(diag)].team)
					) {
						moves.push(diag);
					}
				}
			} else if (this.team === "white") {
				const forwards = [[x, y - 1]];
				if (y === 6) forwards.push([x, y - 2]);

				for (const fwd of forwards) {
					if (isRealCoord(fwd) && board[toPos(fwd)].team === "none") {
						moves.push(fwd);
					}
				}

				const diags = [
					[x - 1, y - 1],
					[x + 1, y - 1],
				];
				for (const diag of diags) {
					if (
						isRealCoord(diag) &&
						!["none", this.team].includes(board[toPos(diag)].team)
					) {
						moves.push(diag);
					}
				}
			}
		}
		if (this.piece === "knight") {
			moves = [
				[x - 2, y + 1],
				[x - 2, y - 1],
				[x + 2, y + 1],
				[x + 2, y - 1],
				[x + 1, y + 2],
				[x + 1, y - 2],
				[x - 1, y + 2],
				[x - 1, y - 2],
			].filter(isRealCoord);
		}
		if (this.piece === "bishop" || this.piece === "queen") {
			const checks = {
				left: true,
				right: true,
			};
			for (let i = y + 1; i < 8; i++) {
				if (checks.right) {
					const right = [x + (i - y), i];
					if (!isRealCoord(right) || board[toPos(right)].team === this.team) {
						checks.right = false;
					} else {
						if (["none", this.team].includes(board[toPos(right)].team)) {
							checks.right = false;
						}
						moves.push(right);
					}
				}
				if (checks.left) {
					const left = [x - (i - y), i];
					if (!isRealCoord(left) || board[toPos(left)].team === this.team) {
						checks.left = false;
					} else {
						if (!["none", this.team].includes(board[toPos(left)].team)) {
							checks.left = false;
						}
						moves.push(left);
					}
				}
			}
			checks.left = true;
			checks.right = true;
			for (let i = y - 1; i > -1; i--) {
				if (checks.right) {
					const right = [x + (i - y), i];
					if (!isRealCoord(right) || board[toPos(right)].team === this.team) {
						checks.right = false;
					} else {
						if (this.isOtherTeam(board[toPos(right)].team)) {
							checks.right = false;
						}
						moves.push(right);
					}
				}
				if (checks.left) {
					const left = [x - (i - y), i];
					if (!isRealCoord(left) || board[toPos(left)].team === this.team) {
						checks.left = false;
					} else {
						if (this.isOtherTeam(board[toPos(left)].team)) {
							checks.left = false;
						}
						moves.push(left);
					}
				}
			}
		}
		if (this.piece === "rook" || this.piece === "queen") {
			for (let i = y + 1; i < 8; i++) {
				if (board[toPos([x, i])].team === this.team) {
					break;
				}
				moves.push([x, i]);
				if (this.isOtherTeam(board[toPos([x, i])].team)) {
					break;
				}
			}
			for (let i = y - 1; i > -1; i--) {
				if (board[toPos([x, i])].team === this.team) {
					break;
				}
				moves.push([x, i]);
				if (this.isOtherTeam(board[toPos([x, i])].team)) {
					break;
				}
			}
			for (let j = x + 1; j < 8; j++) {
				if (board[toPos([j, y])].team === this.team) {
					break;
				}
				moves.push([j, y]);
				if (this.isOtherTeam(board[toPos([j, y])].team)) {
					break;
				}
			}
			for (let j = x - 1; j > -1; j--) {
				if (board[toPos([j, y])].team === this.team) {
					break;
				}
				moves.push([j, y]);
				if (this.isOtherTeam(board[toPos([j, y])].team)) {
					break;
				}
			}
		}
		if (this.piece === "king") {
			moves = [
				[x, y + 1],
				[x, y - 1],

				[x + 1, y],
				[x - 1, y],

				[x + 1, y + 1],
				[x - 1, y - 1],

				[x + 1, y - 1],
				[x - 1, y + 1],
			].filter(isRealCoord);
		}
		return moves.map((move) => toPos(move)).filter(isRealMove);
	}

	y() {
		return Math.floor(this.pos / 8);
	}

	x() {
		return this.pos % 8;
	}

	isOtherTeam(team: Team) {
		return !["none", this.team].includes(team);
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
