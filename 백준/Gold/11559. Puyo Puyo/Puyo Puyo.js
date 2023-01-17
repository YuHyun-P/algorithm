const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(board) {
  const n = 12;
  const m = 6;
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  const outOfBound = (row, col) => row < 0 || col < 0 || n <= row || m <= col;
  const remove = ([row, col]) => (board[row][col] = ".");
  const down = () => {
    for (let col = 0; col < m; col++) {
      const stack = [];
      for (let row = 0; row < n; row++) {
        if (board[row][col] === ".") {
          continue;
        }

        stack.push(board[row][col]);
        remove([row, col]);
      }

      let row = n - 1;
      while (stack.length) {
        board[row--][col] = stack.pop();
      }
    }
  };
  const bfs = (startRow, startCol, visited) => {
    let head = 0;
    const queue = [[startRow, startCol]];

    visited[startRow][startCol] = true;
    while (queue.length - head) {
      const [row, col] = queue[head++];
      for (let move = 0; move < dr.length; move++) {
        const nextRow = row + dr[move];
        const nextCol = col + dc[move];

        if (
          outOfBound(nextRow, nextCol) ||
          visited[nextRow][nextCol] ||
          board[nextRow][nextCol] !== board[startRow][startCol]
        ) {
          continue;
        }

        visited[nextRow][nextCol] = true;
        queue.push([nextRow, nextCol]);
      }
    }

    return queue;
  };

  let done = false;
  let chain = 0;
  while (!done) {
    let connectedCount = 0;
    const visited = Array.from(Array(n), () => Array(m).fill(false));

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < m; col++) {
        if (board[row][col] === "." || visited[row][col]) {
          continue;
        }

        const connected = bfs(row, col, visited);
        if (connected.length < 4) {
          continue;
        }

        connected.forEach(remove);
        connectedCount += 1;
      }
    }

    if (connectedCount > 0) {
      chain += 1;
      down();
      continue;
    }

    done = true;
  }

  return chain;
}

console.log(solution(input.map((row) => row.trim().split(""))));
