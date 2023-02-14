const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(Br, Bc, Dr, Dc, Jr, Jc) {
  const N = 1000;
  const bessieDirection = [
    [0, 1, 1, 1, 0, -1, -1, -1],
    [1, 1, 0, -1, -1, -1, 0, 1],
  ];
  const daisyDirection = [
    [0, 1, 0, -1],
    [1, 0, -1, 0],
  ];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const go = (r, c, dr, dc) => {
    if (r === Jr && c === Jc) {
      return 0;
    }

    let head = 0;
    const distance = Array.from(Array(N), () => Array(N).fill(-1));
    const queue = [[r, c]];
    distance[r][c] = 0;

    while (queue.length - head) {
      const [curR, curC] = queue[head++];

      for (let dir = 0; dir < dr.length; dir++) {
        const nextR = curR + dr[dir];
        const nextC = curC + dc[dir];

        if (outOfBound(nextR, nextC)) continue;
        if (distance[nextR][nextC] !== -1) continue;

        distance[nextR][nextC] = distance[curR][curC] + 1;
        queue.push([nextR, nextC]);

        if (nextR === Jr && nextC === Jc) {
          return distance[nextR][nextC];
        }
      }
    }

    return Infinity;
  };

  const bessie = go(Br, Bc, ...bessieDirection);
  const daisy = go(Dr, Dc, ...daisyDirection);

  if (bessie < daisy) return "bessie";
  if (bessie > daisy) return "daisy";
  return "tie";
}

const [Br, Bc] = input[0].trim().split(" ").map(Number);
const [Dr, Dc] = input[1].trim().split(" ").map(Number);
const [Jr, Jc] = input[2].trim().split(" ").map(Number);
console.log(solution(Br, Bc, Dr, Dc, Jr, Jc));
