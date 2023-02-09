const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, curves) {
  const SIZE = 100 + 1;
  const dy = [0, -1, 0, 1];
  const dx = [1, 0, -1, 0];
  const visited = Array.from(Array(SIZE), () => Array(SIZE).fill(false));

  let count = 0;

  const rotate = (d) => (d + 1) % dx.length;
  const draw = ([x, y, d, g]) => {
    const dHistory = [d];
    visited[y][x] = true;

    y = y + dy[d];
    x = x + dx[d];
    visited[y][x] = true;

    while (g) {
      for (let i = dHistory.length - 1; 0 <= i; i--) {
        const nextD = rotate(dHistory[i]);
        y = y + dy[nextD];
        x = x + dx[nextD];
        visited[y][x] = true;
        dHistory.push(nextD);
      }

      g -= 1;
    }
  };

  curves.forEach(draw);

  for (let y = 0; y < SIZE - 1; y++) {
    for (let x = 0; x < SIZE - 1; x++) {
      if (
        visited[y][x] &&
        visited[y][x + 1] &&
        visited[y + 1][x + 1] &&
        visited[y + 1][x]
      )
        count += 1;
    }
  }

  return count;
}

const N = Number(input.shift());
const curves = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, curves));
