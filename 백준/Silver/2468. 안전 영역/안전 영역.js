const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, board) {
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  let maxSafeArea = 1;

  const outOfBound = (row, col) => row < 0 || N <= row || col < 0 || N <= col;
  const getInitialVisited = (limit) => {
    const visited = Array.from(Array(N), () => Array(N).fill(false));
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] <= limit) {
          visited[row][col] = true;
        }
      }
    }
    return visited;
  };
  const getSafeArea = (limit) => {
    let safeArea = 0;
    const visited = getInitialVisited(limit);
    const bfs = (startRow, startCol) => {
      let head = 0;
      const queue = [[startRow, startCol]];
      visited[startRow][startCol] = true;

      while (queue.length - head) {
        const [row, col] = queue[head++];

        for (let move = 0; move < dr.length; move++) {
          const nextRow = row + dr[move];
          const nextCol = col + dc[move];
          if (outOfBound(nextRow, nextCol) || visited[nextRow][nextCol]) {
            continue;
          }

          visited[nextRow][nextCol] = true;
          queue.push([nextRow, nextCol]);
        }
      }
    };

    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (!visited[row][col]) {
          bfs(row, col);
          safeArea += 1;
        }
      }
    }

    return safeArea;
  };

  for (let limit = 1; limit < 100; limit++) {
    const safeArea = getSafeArea(limit);
    maxSafeArea = Math.max(maxSafeArea, safeArea);
  }

  return maxSafeArea;
}

const N = Number(input.shift().trim());
const board = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, board));
