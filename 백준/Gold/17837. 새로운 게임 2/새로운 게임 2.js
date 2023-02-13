const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, color, knights) {
  const WHITE = "0";
  const RED = "1";
  const BLUE = "2";
  const PAD = 1;
  const ROW = 0;
  const COL = 1;
  const DIR = 2;
  const LIMIT_T = 1000;
  const LIMIT_HEIGHT = 4;

  let t = 0;
  let isEnd = false;
  const dr = [PAD, 0, 0, -1, 1];
  const dc = [PAD, 1, -1, 0, 0];
  const board = Array.from(Array(N), () => Array.from(Array(N), () => []));

  const outOfBound = (row, col) => row < 0 || col < 0 || N <= row || N <= col;
  const isBlue = (row, col) => outOfBound(row, col) || color[row][col] === BLUE;
  const flip = (dir) => (dir % 2 === 0 ? dir - 1 : dir + 1);
  const updatePos = (row, col, indices) => {
    indices.forEach((i) => {
      knights[i][ROW] = row;
      knights[i][COL] = col;
    });
  };
  const updateDir = (dir, index) => {
    knights[index][DIR] = dir;
  };
  const getNext = (row, col, dir) => {
    let nextRow = row + dr[dir];
    let nextCol = col + dc[dir];
    let nextDir = dir;

    if (isBlue(nextRow, nextCol)) {
      nextDir = flip(dir);
      nextRow = row + dr[nextDir];
      nextCol = col + dc[nextDir];
      if (isBlue(nextRow, nextCol)) {
        nextRow = row;
        nextCol = col;
      }
    }

    return [nextRow, nextCol, nextDir];
  };
  const move = (knight, i) => {
    const [curRow, curCol, curDir] = knight;
    const [nextRow, nextCol, nextDir] = getNext(curRow, curCol, curDir);
    const height = board[curRow][curCol].findIndex(
      (curIndex) => curIndex === i
    );
    const movedKnights = board[curRow][curCol].splice(height);

    updateDir(nextDir, i);
    if (nextRow === curRow && nextCol === curCol) {
      board[nextRow][nextCol].push(...movedKnights);
      return [nextRow, nextCol];
    }

    if (color[nextRow][nextCol] === WHITE) {
      board[nextRow][nextCol].push(...movedKnights);
      updatePos(nextRow, nextCol, movedKnights);
    }

    if (color[nextRow][nextCol] === RED) {
      board[nextRow][nextCol].push(...movedKnights.reverse());
      updatePos(nextRow, nextCol, movedKnights);
    }

    return [nextRow, nextCol];
  };

  for (let i = 0; i < K; i++) {
    knights[i][ROW] -= PAD;
    knights[i][COL] -= PAD;
    board[knights[i][ROW]][knights[i][COL]].push(i);
  }

  while (t < LIMIT_T && !isEnd) {
    for (let i = 0; i < K && !isEnd; i++) {
      const [nextRow, nextCol] = move(knights[i], i);
      if (board[nextRow][nextCol].length >= LIMIT_HEIGHT) isEnd = true;
    }
    t += 1;
  }

  return isEnd ? t : -1;
}

const [N, K] = input.shift().trim().split(" ").map(Number);
const color = input.splice(0, N).map((row) => row.trim().split(" "));
const knights = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, K, color, knights));
