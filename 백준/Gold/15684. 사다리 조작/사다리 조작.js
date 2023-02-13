const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, H, bridges) {
  const LIMIT = 3;
  const PAD = 1;

  let minAdded = Infinity;
  const board = Array.from(Array(H), () => Array(N).fill(-1));

  const getResultOf = (start) => {
    let curX = start;
    let curY = 0;

    while (curY < H) {
      while (curY < H && board[curY][curX] === -1) curY += 1;
      if (curY === H) break;
      curX = board[curY][curX];
      curY += 1;
    }

    return curX;
  };
  const isValidBoard = () => {
    for (let start = 0; start < N; start++) {
      if (getResultOf(start) !== start) return false;
    }
    return true;
  };
  const addBridge = (a, b) => {
    board[a][b] = b + 1;
    board[a][b + 1] = b;
  };
  const removeBridge = (a, b) => {
    board[a][b] = -1;
    board[a][b + 1] = -1;
  };

  const dfs = (index, added) => {
    if (isValidBoard()) {
      minAdded = Math.min(minAdded, added);
      return;
    }

    while (index < H * N - 1 && added < LIMIT) {
      index += 1;
      const [nextY, nextX] = [Math.floor(index / N), index % N];

      if (board[nextY][nextX] === -1 && board[nextY][nextX + 1] === -1) {
        addBridge(nextY, nextX);
        dfs(index + 1, added + 1);
        removeBridge(nextY, nextX);
      }
    }
  };

  bridges.forEach(([a, b]) => addBridge(a - PAD, b - PAD));
  dfs(-1, 0);
  return minAdded !== Infinity ? minAdded : -1;
}

const [N, M, H] = input.shift().split(" ").map(Number);
const bridges = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, H, bridges));
