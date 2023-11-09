const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const board = [
	["r", "n", "b", "q", "k", "b", "n", "r"],
	["p", "p", "p", "p", "p", "p", "p", "p"],
	["e", "e", "e", "e", "e", "e", "e", "e"],
	["e", "e", "e", "e", "e", "e", "e", "e"],
	["e", "e", "e", "e", "e", "e", "e", "e"],
	["e", "e", "e", "e", "e", "e", "e", "e"],
	["P", "P", "P", "P", "P", "P", "P", "P"],
	["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const moves = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
];

const boardHeight = 8;
const boardWidth = 8;

const images = {};
const selected = { x: -1, y: -1 };

canvas.addEventListener("mousedown", (ev) => {
	const x = ev.pageX;
	const y = ev.pageY;
	const pieceX = Math.floor(x / 100);
	const pieceY = Math.floor(y / 100);
	if (getMove(pieceY, pieceX)) {
		board[pieceY][pieceX] = board[selected.y][selected.x];
		board[selected.y][selected.x] = "e";
		selected.x = -1;
		selected.y = -1;
		clearMove();
	} else {
		clearMove();
		selected.x = pieceX;
		selected.y = pieceY;
		calculateMoves();
	}
	draw();
});

async function start() {
	await loadImages();
	await draw();
}

async function calculateMoves() {
	const { x, y } = selected;
	const piece = getPiece(y, x);

	//black pawn
	if (piece == "p") {
		if (getPiece(y + 1, x) == "e") {
			setMove(y + 1, x);
			if (y == 1) {
				setMove(y + 2, x);
			}
		}
		if (getPiece(y + 1, x + 1) != "e") {
			setMove(y + 1, x + 1);
		}
		if (getPiece(y + 1, x - 1) != "e") {
			setMove(y + 1, x - 1);
		}
	}

	//white pawn
	if (piece == "P") {
		if (getPiece(y - 1, x) == "e") {
			setMove(y - 1, x);
			if (y == 6) {
				setMove(y - 2, x);
			}
		}
		if (getPiece(y - 1, x + 1) != "e") {
			setMove(y - 1, x + 1);
		}
		if (getPiece(y - 1, x - 1) != "e") {
			setMove(y - 1, x - 1);
		}
	}

	//white rook
	if (piece == "R") {
		let moveY_ = -1;
		while (getPiece(y + moveY_, x) == "e") {
			setMove(y + moveY_, x);
			moveY_--;
		}
		let moveY = 1;
		while (getPiece(y + moveY, x) == "e") {
			setMove(y + moveY, x);
			moveY++;
		}
		let moveX = 1;
		while (getPiece(y, x + moveX) == "e") {
			setMove(y, x + moveX);
			moveX++;
		}
		let moveX_ = -1;
		while (getPiece(y, x + moveX_) == "e") {
			setMove(y, x + moveX_);
			moveX_--;
		}

		if (isBlack(y + moveY_, x)) {
			setMove(y + moveY_, x);
		}
		if (isBlack(y + moveY, x)) {
			setMove(y + moveY, x);
		}
		if (isBlack(y, x + moveX)) {
			setMove(y, x + moveX);
		}
		if (isBlack(y, x + moveX_)) {
			setMove(y, x + moveX_);
		}
	}

	//black rook
	if (piece == "r") {
		let moveY_ = -1;
		while (getPiece(y + moveY_, x) == "e") {
			setMove(y + moveY_, x);
			moveY_--;
		}
		let moveY = 1;
		while (getPiece(y + moveY, x) == "e") {
			setMove(y + moveY, x);
			moveY++;
		}
		let moveX = 1;
		while (getPiece(y, x + moveX) == "e") {
			setMove(y, x + moveX);
			moveX++;
		}
		let moveX_ = -1;
		while (getPiece(y, x + moveX_) == "e") {
			setMove(y, x + moveX_);
			moveX_--;
		}

		if (isWhite(y + moveY_, x)) {
			setMove(y + moveY_, x);
		}
		if (isWhite(y + moveY, x)) {
			setMove(y + moveY, x);
		}
		if (isWhite(y, x + moveX)) {
			setMove(y, x + moveX);
		}
		if (isWhite(y, x + moveX_)) {
			setMove(y, x + moveX_);
		}
	}

	//white knight
	if (piece == "N") {
		if (getPiece(y + 2, x + 1) != "m" && !isWhite(y + 2, x + 1)) {
			setMove(y + 2, x + 1);
		}
		if (getPiece(y + 2, x - 1) != "m" && !isWhite(y + 2, x - 1)) {
			setMove(y + 2, x - 1);
		}
		if (getPiece(y - 2, x - 1) != "m" && !isWhite(y - 2, x - 1)) {
			setMove(y - 2, x - 1);
		}
		if (getPiece(y - 2, x + 1) != "m" && !isWhite(y - 2, x + 1)) {
			setMove(y - 2, x + 1);
		}
		if (getPiece(y + 1, x + 2) != "m" && !isWhite(y + 1, x + 2)) {
			setMove(y + 1, x + 2);
		}
		if (getPiece(y + 1, x - 2) != "m" && !isWhite(y + 1, x - 2)) {
			setMove(y + 1, x - 2);
		}
		if (getPiece(y - 1, x - 2) != "m" && !isWhite(y - 1, x - 2)) {
			setMove(y - 1, x - 2);
		}
		if (getPiece(y - 1, x + 2) != "m" && !isWhite(y - 1, x + 2)) {
			setMove(y - 1, x + 2);
		}
	}

	//black knight
	if (piece == "n") {
		if (getPiece(y + 2, x + 1) != "m" && !isBlack(y + 2, x + 1)) {
			setMove(y + 2, x + 1);
		}
		if (getPiece(y + 2, x - 1) != "m" && !isBlack(y + 2, x - 1)) {
			setMove(y + 2, x - 1);
		}
		if (getPiece(y - 2, x - 1) != "m" && !isBlack(y - 2, x - 1)) {
			setMove(y - 2, x - 1);
		}
		if (getPiece(y - 2, x + 1) != "m" && !isBlack(y - 2, x + 1)) {
			setMove(y - 2, x + 1);
		}
		if (getPiece(y + 1, x + 2) != "m" && !isBlack(y + 1, x + 2)) {
			setMove(y + 1, x + 2);
		}
		if (getPiece(y + 1, x - 2) != "m" && !isBlack(y + 1, x - 2)) {
			setMove(y + 1, x - 2);
		}
		if (getPiece(y - 1, x - 2) != "m" && !isBlack(y - 1, x - 2)) {
			setMove(y - 1, x - 2);
		}
		if (getPiece(y - 1, x + 2) != "m" && !isBlack(y - 1, x + 2)) {
			setMove(y - 1, x + 2);
		}
	}
}

async function draw() {
	let i = 0;
	for (y in board) {
		for (x in board[y]) {
			//DRAWING BOARD
			if (i % 2 == 0) {
				ctx.fillStyle = "#fff";
			} else {
				ctx.fillStyle = "#964B00";
			}
			ctx.fillRect(x * 100, y * 100, x * 100 + 100, y * 100 + 100);
			i++;

			//DRAWING PIECES

			const piece = getPiece(y, x);
			if (getMove(y, x)) {
				ctx.fillStyle = "rgba(255,0,0,60)";
				ctx.fillRect(x * 100, y * 100, x * 100 + 100, y * 100 + 100);
			}

			if (piece != "e") {
				ctx.drawImage(images[piece], x * 100, y * 100, 100, 100);
			}
		}
		i++;
	}
}

function getPiece(y, x) {
	if (x > 7 || y > 7 || x < 0 || y < 0) {
		return "m";
	}
	return board[y][x];
}

function setPiece(y, x, piece) {
	board[y][x] = piece;
}

function getMove(y, x) {
	return moves[y][x];
}

function setMove(y, x) {
	moves[y][x] = 1;
}

function reMove(y, x) {
	moves[y][x] = 0;
}

function clearMove() {
	for (y in moves) {
		for (x in moves) {
			moves[y][x] = 0;
		}
	}
}

function isWhite(y, x) {
	const whites = ["P", "R", "N", "B", "K", "Q"];
	return whites.includes(getPiece(y, x));
}

function isBlack(y, x) {
	const blacks = ["p", "r", "n", "b", "k", "q"];
	return blacks.includes(getPiece(y, x));
}

async function loadImages() {
	images.P = await loadImage("/images/p_w.png");
	images.R = await loadImage("/images/r_w.png");
	images.N = await loadImage("/images/n_w.png");
	images.B = await loadImage("/images/b_w.png");
	images.K = await loadImage("/images/k_w.png");
	images.Q = await loadImage("/images/q_w.png");
	images.p = await loadImage("/images/p_b.png");
	images.r = await loadImage("/images/r_b.png");
	images.n = await loadImage("/images/n_b.png");
	images.b = await loadImage("/images/b_b.png");
	images.k = await loadImage("/images/k_b.png");
	images.q = await loadImage("/images/q_b.png");
}

function loadImage(filename) {
	return new Promise((resolve) => {
		const img = new Image();
		img.src = filename;
		img.onload = () => {
			resolve(img);
		};
	});
}

function sleep(millisec) {
	return new Promise((resolve) => {
		setTimeout(resolve, millisec);
	});
}
