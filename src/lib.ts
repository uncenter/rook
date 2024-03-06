export enum Side {
	None = -1,
	White = 0,
	Black = 1,
}

export enum Piece {
	None = -100,
	Pawn = 100,
	Knight = 200,
	Bishop = 300,
	Rook = 400,
	Queen = 500,
	King = 600,
}

export type Coordinate = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Position = [Coordinate, Coordinate];
export type Square = [Piece, Side];
export type Row = Square[];
export type Board = Row[];

export const EMPTY_ROW: Row = new Array(8).fill([Piece.None, Side.None]);

export const PAWN_ROW = (side: Side): Row =>
	new Array(8).fill([Piece.Pawn, side]);
export const HOME_ROW = (side: Side): Row =>
	[
		Piece.Rook,
		Piece.Knight,
		Piece.Bishop,
		Piece.Queen,
		Piece.King,
		Piece.Bishop,
		Piece.Knight,
		Piece.Rook,
	].map((piece) => [piece, side]);

export const BASE_BOARD: Board = [
	HOME_ROW(Side.Black),
	PAWN_ROW(Side.Black),
	EMPTY_ROW,
	EMPTY_ROW,
	EMPTY_ROW,
	EMPTY_ROW,
	PAWN_ROW(Side.White),
	HOME_ROW(Side.White),
];

export function getPossibleMoves(position: Position, board: Board) {
	let possibles: Position[] = [];

	const [row, column] = position;
	const [piece, side] = board[row][column];

	const otherSide = side === Side.White ? Side.Black : Side.White;

	switch (piece) {
		case Piece.Pawn: {
			if (side === Side.White) {
				for (let i = row - 1; i > row - 3; i--) {
					const [_, s] = board[i][column];
					if (s === Side.Black) {
						break;
					}
					possibles.push([i as Coordinate, column]);
				}
			} else {
				for (let i = row + 1; i < row + 3; i++) {
					const [_, s] = board[i][column];
					if (s === Side.White) {
						break;
					}
					possibles.push([i as Coordinate, column]);
				}
			}
			break;
		}
		case Piece.Knight: {
			possibles = [
				[row - 2, column - 1],
				[row - 2, column + 1],
				[row + 2, column - 1],
				[row + 2, column + 1],
				[row + 1, column - 2],
				[row + 1, column + 2],
				[row - 1, column - 2],
				[row - 1, column + 2],
			] as Position[];
			break;
		}
		case Piece.Bishop: {
		}
		case Piece.Rook: {
			for (let i = 0; i < 8; i++) {
				const [_, s] = board[i][column];
				if (s === Side.Black) {
					break;
				}
				possibles.push([i as Coordinate, column]);
			}
		}
	}
	return possibles.filter(
		(move) =>
			move[0] < 8 &&
			move[0] > -1 &&
			move[1] < 8 &&
			move[1] > -1 &&
			(board[move[0]][move[1]][1] === otherSide ||
				board[move[0]][move[1]][0] === Piece.None)
	) as Position[];
}
