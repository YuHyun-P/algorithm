const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, N, P, board, player, hp) {
  const [BOSS, WALL] = ["B", "X"];
  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let boss;
  const playerMap = new Map(player);
  const outOfBound = (r, c) => r < 0 || c < 0 || M <= r || N <= c;
  const play = (bossR, bossC) => {
    let t = 0;
    let accDps = 0;
    let nPlayer = 0;

    let head = 0;
    const queue = [];
    const distance = Array.from(Array(M), () => Array(N).fill(-1));

    distance[bossR][bossC] = 0;
    queue.push([bossR, bossC]);

    while (queue.length - head) {
      const [r, c] = queue[head++];

      if (playerMap.has(board[r][c])) {
        if (t < distance[r][c]) {
          hp -= (distance[r][c] - t) * accDps;
          t = distance[r][c];
        }
        if (hp <= 0) return nPlayer;

        accDps += playerMap.get(board[r][c]);
        nPlayer += 1;
      }

      for (const [dr, dc] of direction) {
        const [nr, nc] = [r + dr, c + dc];
        if (outOfBound(nr, nc)) continue;
        if (board[nr][nc] === WALL) continue;
        if (distance[nr][nc] >= 0) continue;

        distance[nr][nc] = distance[r][c] + 1;
        queue.push([nr, nc]);
      }
    }

    return nPlayer;
  };

  for (let index = 0; index < N * M; index++) {
    const [r, c] = [Math.floor(index / N), index % N];
    if (board[r][c] === BOSS) {
      boss = [r, c];
      break;
    }
  }

  return play(...boss);
}

const [M, N, P] = input.shift().split(" ").map(Number);
const board = input.splice(0, M);
const player = input.splice(0, P).map((row) => {
  const [id, dps] = row.split(" ");
  return [id, Number(dps)];
});
const hp = Number(input[0]);
console.log(solution(M, N, P, board, player, hp));
