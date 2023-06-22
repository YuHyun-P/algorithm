const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(R, C, M, sharkInfos) {
  const DIRECTION = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  let totalSharkSize = 0;
  let sharks = Array.from(Array(R), () => Array(C).fill(null));
  sharkInfos.forEach(([r, c, speed, dir, size]) => {
    sharks[r - 1][c - 1] = { speed, dir: dir - 1, size };
  });

  const outOfBound = (r, c) => r < 0 || c < 0 || R <= r || C <= c;

  const caught = (fisherman) => {
    for (let r = 0; r < R; r++) {
      if (sharks[r][fisherman]) {
        const size = sharks[r][fisherman].size;
        sharks[r][fisherman] = null;
        return size;
      }
    }
    return 0;
  };

  const moveAll = () => {
    const moved = Array.from(Array(R), () => Array(C).fill(null));
    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        if (!sharks[r][c]) {
          continue;
        }

        const { speed, dir, size } = sharks[r][c];
        const [nr, nc, ndir] = move(r, c, speed, dir);
        if (moved[nr][nc] && size < moved[nr][nc].size) {
          continue;
        }

        moved[nr][nc] = { speed, dir: ndir, size };
      }
    }

    sharks = moved;
  };

  const move = (r, c, speed, dir) => {
    const roundTrip = dir < 2 ? 2 * (R - 1) : 2 * (C - 1);
    const offset = speed % roundTrip;

    let [nr, nc, ndir] = [r, c, dir];
    let [dr, dc] = DIRECTION[ndir];
    for (let i = 0; i < offset; i++) {
      if (outOfBound(nr + dr, nc + dc)) {
        ndir += ndir % 2 === 0 ? 1 : -1;
        [dr, dc] = DIRECTION[ndir];
      }

      nr += dr;
      nc += dc;
    }

    return [nr, nc, ndir];
  };

  for (let fisherman = 0; fisherman < C; fisherman++) {
    totalSharkSize += caught(fisherman);
    moveAll();
  }

  return totalSharkSize;
}

const [R, C, M] = input.shift().split(" ").map(Number);
const sharkInfos = input.map((sharkString) =>
  sharkString.split(" ").map(Number)
);
console.log(solution(R, C, M, sharkInfos));
