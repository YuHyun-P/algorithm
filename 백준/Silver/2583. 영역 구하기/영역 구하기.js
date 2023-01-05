const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(M, N, rectangular) {
  const area = [];
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const visited = Array.from(Array(M), () => Array(N).fill(false));
  rectangular.forEach(([x1, y1, x2, y2]) => {
    for (let row = y1; row < y2; row++) {
      for (let col = x1; col < x2; col++) {
        visited[row][col] = true;
      }
    }
  });

  const outOfBound = (row, col) => row < 0 || M <= row || col < 0 || N <= col;
  const bfs = ([startRow, startCol]) => {
    let head = 0;
    const queue = [[startRow, startCol]];
    visited[startRow][startCol] = true;
    let count = 1;

    while (queue.length - head) {
      const [row, col] = queue[head++];
      for (let move = 0; move < 4; move++) {
        const nextRow = row + dr[move];
        const nextCol = col + dc[move];
        if (outOfBound(nextRow, nextCol) || visited[nextRow][nextCol]) {
          continue;
        }
        visited[nextRow][nextCol] = true;
        queue.push([nextRow, nextCol]);
        count += 1;
      }
    }
    return count;
  };

  for (let row = 0; row < M; row++) {
    for (let col = 0; col < N; col++) {
      if (visited[row][col]) {
        continue;
      }

      area.push(bfs([row, col]));
    }
  }
  return [area.length, area.sort((a, b) => a - b).join(" ")];
}

const [M, N, K] = input.shift().trim().split(" ").map(Number);
const rectangular = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(M, N, rectangular).join("\n"));
