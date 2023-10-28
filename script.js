const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const board = [
	[
		[2, 2],
		[3, 2],
		[4, 2],
		[5, 2],
		[6, 2],
		[4, 2],
		[3, 2],
		[2, 2],
	],
	[
		[1, 2],
		[1, 2],
		[1, 2],
		[1, 2],
		[1, 2],
		[1, 2],
		[1, 2],
		[1, 2],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
	],
	[
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
		[1, 1],
	],
	[
		[2, 1],
		[3, 1],
		[4, 1],
		[5, 1],
		[6, 1],
		[4, 1],
		[3, 1],
		[2, 1],
	],
];

const colorE = {
	empty: 0,
	white: 1,
	black: 2,
};

const piecesE = {
	empty: 0,
	pawn: 1,
	rock: 2,
	knight: 3,
	bishop: 4,
	queen: 5,
	king: 6,
};

const boardHeight = 8;
const boardWidth = 8;

draw();
function draw() {
	let i = 0;
	for (x in board) {
		for (y in board[x]) {
			//DRAWING BOARD
			if (i % 2 == 0) {
				ctx.fillStyle = "#000";
			} else {
				ctx.fillStyle = "#fff";
			}
			ctx.fillRect(x * 100, y * 100, x * 100 + 100, y * 100 + 100);
			i++;

			//DRAWING PIECES

			if (i % 2 == 0) {
				ctx.fillStyle = "#000";
			} else {
				ctx.fillStyle = "#fff";
			}
			const piece = board[x][y];
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "30px Arial";
			ctx.fillText(piece, x * 100 + 50, y * 100 + 50);
		}
		i++;
	}
}
