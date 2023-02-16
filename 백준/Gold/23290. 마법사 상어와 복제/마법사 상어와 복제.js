const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, S, fishes, Sx, Sy) {
  const PAD = 1;
  const N = 4;
  const SMELL_DURATION = 2;
  const FISH_DIRECTION = 8;
  const SHARK_DIRECTION = 4;

  let curTime = 0;
  const fishDir = {
    dx: [0, -1, -1, -1, 0, 1, 1, 1],
    dy: [-1, -1, 0, 1, 1, 1, 0, -1],
  };
  const sharkDir = {
    dx: [-1, 0, 1, 0],
    dy: [0, -1, 0, 1],
  };
  const smellBaseTime = Array.from(Array(N), () => Array(N).fill(-Infinity));
  const prev = createBoard(N);

  const sum = (acc, cur) => acc + cur;
  const outOfBound = (x, y) => x < 0 || y < 0 || N <= x || N <= y;
  const isShark = (x, y) => Sx === x && Sy === y;
  const isSmell = (x, y, curTime) =>
    smellBaseTime[x][y] + SMELL_DURATION >= curTime;
  const moveFishes = (curTime) => {
    const next = createBoard(N);

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let dir = 0; dir < FISH_DIRECTION; dir++) {
          if (prev[x][y][dir] === 0) continue;

          let offset = 0;
          for (; offset < FISH_DIRECTION; offset++) {
            const nextDir = (dir - offset + FISH_DIRECTION) % FISH_DIRECTION;
            const nextX = x + fishDir.dx[nextDir];
            const nextY = y + fishDir.dy[nextDir];

            if (outOfBound(nextX, nextY)) continue;
            if (isShark(nextX, nextY)) continue;
            if (isSmell(nextX, nextY, curTime)) continue;

            next[nextX][nextY][nextDir] += prev[x][y][dir];
            break;
          }
          if (offset === FISH_DIRECTION) next[x][y][dir] += prev[x][y][dir];
        }
      }
    }

    return next;
  };
  const selectSharkPath = (board) => {
    const LIMIT = 3;

    let maxFish = -Infinity;
    let maxPath = null;

    const dfs = (x, y, fish, path) => {
      if (path.length === LIMIT) {
        if (maxFish < fish) {
          maxFish = fish;
          maxPath = [...path];
        }
        return;
      }

      for (let dir = 0; dir < SHARK_DIRECTION; dir++) {
        const nextX = x + sharkDir.dx[dir];
        const nextY = y + sharkDir.dy[dir];

        if (outOfBound(nextX, nextY)) continue;

        const curFish = board[nextX][nextY].reduce(sum, 0);
        const tmp = [...board[nextX][nextY]];
        board[nextX][nextY] = Array(FISH_DIRECTION).fill(0);

        path.push([nextX, nextY]);

        dfs(nextX, nextY, fish + curFish, path);

        board[nextX][nextY] = tmp;

        path.pop();
      }
    };

    dfs(Sx, Sy, 0, []);
    return maxPath;
  };
  const moveShark = (board, path, curTime) => {
    path.forEach(([x, y]) => {
      for (let dir = 0; dir < FISH_DIRECTION; dir++) {
        if (board[x][y][dir] === 0) continue;
        hasFish = true;
        board[x][y][dir] = 0;
        smellBaseTime[x][y] = curTime;
      }
    });

    return path.at(-1);
  };
  const clone = (next) => {
    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        for (let dir = 0; dir < FISH_DIRECTION; dir++) {
          prev[x][y][dir] += next[x][y][dir];
        }
      }
    }
  };

  Sx -= PAD;
  Sy -= PAD;
  fishes.forEach((row) => {
    const [Fx, Fy, d] = row.trim().split(" ").map(Number);
    prev[Fx - PAD][Fy - PAD][d - PAD] += 1;
  });

  while (curTime < S) {
    const next = moveFishes(curTime);
    const sharkPath = selectSharkPath(next);
    [Sx, Sy] = moveShark(next, sharkPath, curTime);
    clone(next);
    curTime += 1;
  }

  return prev.reduce(
    (acc, row) => acc + row.reduce((acc, col) => acc + col.reduce(sum, 0), 0),
    0
  );
}

function createBoard(N) {
  return Array.from(Array(N), () =>
    Array.from(Array(N), () => Array(8).fill(0))
  );
}

const [M, S] = input.shift().trim().split(" ").map(Number);
const [Sx, Sy] = input.pop().trim().split(" ").map(Number);
console.log(solution(M, S, input, Sx, Sy));
