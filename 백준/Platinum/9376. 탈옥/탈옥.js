const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(h, w, board) {
  const PAD = 1;
  const [EMPTY, WALL, DOOR, PRISONER] = [".", "*", "#", "$"];
  const EXIT = [0, 0];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const [paddedH, paddedW] = [h + PAD * 2, w + PAD * 2];
  const paddedBoard = Array.from(Array(paddedH), () =>
    Array(paddedW).fill(EMPTY)
  );
  const prisoner = [];

  const outOfBound = (r, c) => r < 0 || c < 0 || paddedH <= r || paddedW <= c;
  const bfs = (startR, startC) => {
    let head = 0;
    const queue = [[startR, startC]];
    const nOpened = Array.from(Array(paddedH), () =>
      Array(paddedW).fill(Infinity)
    );
    nOpened[startR][startC] = 0;

    while (queue.length - head) {
      const [r, c] = queue[head++];
      const cur = nOpened[r][c];

      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (paddedBoard[nr][nc] === WALL) continue;

        const next = cur + (paddedBoard[nr][nc] === DOOR ? 1 : 0);
        if (nOpened[nr][nc] <= next) continue;
        nOpened[nr][nc] = next;
        queue.push([nr, nc]);
      }
    }

    return nOpened;
  };

  for (let index = 0; index < h * w; index++) {
    const [r, c] = [Math.floor(index / w), index % w];
    if (board[r][c] === PRISONER) prisoner.push([r + PAD, c + PAD]);
    paddedBoard[r + PAD][c + PAD] = board[r][c];
  }

  let min = Infinity;
  const prisonerOne = bfs(...prisoner[0]);
  const prisonerTwo = bfs(...prisoner[1]);
  const exit = bfs(...EXIT);

  for (let r = 0; r < paddedH; r++) {
    for (let c = 0; c < paddedW; c++) {
      if (paddedBoard[r][c] === WALL) continue;
      const nOpened =
        prisonerOne[r][c] +
        prisonerTwo[r][c] +
        exit[r][c] -
        (paddedBoard[r][c] === DOOR ? 2 : 0);
      if (nOpened < min) min = nOpened;
    }
  }
  return min;
}

let cursor = 0;
const T = Number(input[cursor++]);
const answer = [];
for (let t = 0; t < T; t++) {
  const [h, w] = input[cursor++].split(" ").map(Number);
  const board = input.slice(cursor, cursor + h);
  answer.push(solution(h, w, board));
  cursor += h;
}
console.log(answer.join("\n"));
