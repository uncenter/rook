import type { Piece, Team } from '../lib';

import BlackPawn from './black/pawn.svg?raw';
import BlackKnight from './black/knight.svg?raw';
import BlackBishop from './black/bishop.svg?raw';
import BlackRook from './black/rook.svg?raw';
import BlackQueen from './black/queen.svg?raw';
import BlackKing from './black/king.svg?raw';

import WhitePawn from './white/pawn.svg?raw';
import WhiteKnight from './white/knight.svg?raw';
import WhiteBishop from './white/bishop.svg?raw';
import WhiteRook from './white/rook.svg?raw';
import WhiteQueen from './white/queen.svg?raw';
import WhiteKing from './white/king.svg?raw';

export default {
	black: {
		pawn: BlackPawn,
		knight: BlackKnight,
		bishop: BlackBishop,
		rook: BlackRook,
		queen: BlackQueen,
		king: BlackKing,
	},
	white: {
		pawn: WhitePawn,
		knight: WhiteKnight,
		bishop: WhiteBishop,
		rook: WhiteRook,
		queen: WhiteQueen,
		king: WhiteKing,
	},
} as Record<Team, Record<Piece, string>>;
