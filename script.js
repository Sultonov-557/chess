const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const board = [
  ["r", "n", "b", "k", "q", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "K", "Q", "B", "N", "R"],
];

const boardHeight = 8;
const boardWidth = 8;

const images = {};

const pieceInMouse = { x: 0, y: 0, piece: "e" };
canvas.addEventListener("mousedown", (ev) => {
  const x = ev.pageX;
  const y = ev.pageY;
  const pieceX = Math.floor(x / 100);
  const pieceY = Math.floor(y / 100);
  console.log(board[pieceY][pieceX]);
});

async function start() {
  await loadImages();
  while (true) {
    await draw();
    await sleep(500);
  }
}

async function draw() {
  let i = 0;
  for (y in board) {
    for (x in board[y]) {
      //DRAWING BOARD
      if (i % 2 == 0) {
        ctx.fillStyle = "#131313";
      } else {
        ctx.fillStyle = "#fff";
      }
      ctx.fillRect(x * 100, y * 100, x * 100 + 100, y * 100 + 100);
      i++;

      //DRAWING PIECES

      const piece = board[y][x];
      if (piece != "e") {
        ctx.drawImage(images[piece], x * 100, y * 100, 100, 100);
      }
    }
    i++;
  }
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
