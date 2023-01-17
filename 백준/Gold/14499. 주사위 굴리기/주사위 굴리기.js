const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, x, y, board, direction) {
  const answer = [];
  let curX = x;
  let curY = y;
  const dx = [null, 0, 0, -1, 1];
  const dy = [null, 1, -1, 0, 0];
  const outOfBound = (x, y) => x < 0 || y < 0 || N <= x || M <= y;

  const DICE_N = 4;
  const DICE_M = 3;
  const dice = [
    [-1, 0, -1],
    [0, 0, 0],
    [-1, 0, -1],
    [-1, 0, -1],
  ];
  const rotate = () => {
    const rotated = Array.from(Array(DICE_M), () => Array(DICE_N).fill(-1));
    for (let row = 0; row < DICE_N; row++) {
      for (let col = 0; col < DICE_M; col++) {
        rotated[DICE_M - 1 - col][row] = dice[row][col];
      }
    }

    return rotated;
  };
  const move = (dir) => {
    if (dir === 1) {
      [dice[1][2], dice[3][1]] = [dice[3][1], dice[1][2]];
      dice[1].unshift(dice[1].pop());
      return;
    }

    if (dir === 2) {
      dice[1].push(dice[1].shift());
      [dice[1][2], dice[3][1]] = [dice[3][1], dice[1][2]];
      return;
    }

    const rotated = rotate();
    if (dir === 3) {
      rotated[1].push(rotated[1].shift());
    }

    if (dir === 4) {
      rotated[1].unshift(rotated[1].pop());
    }

    for (let col = 0; col < rotated[1].length; col++) {
      dice[col][1] = rotated[1][col];
    }
  };

  for (const dir of direction) {
    const nextX = curX + dx[dir];
    const nextY = curY + dy[dir];

    if (outOfBound(nextX, nextY)) {
      continue;
    }

    move(dir, dice);
    if (board[nextX][nextY] !== 0) {
      dice[3][1] = board[nextX][nextY];
      board[nextX][nextY] = 0;
    } else {
      board[nextX][nextY] = dice[3][1];
    }

    answer.push(dice[1][1]);
    curX = nextX;
    curY = nextY;
  }

  return answer.join("\n");
}

const [N, M, x, y, K] = input.shift().trim().split(" ").map(Number);
const direction = input.pop().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, x, y, board, direction));
