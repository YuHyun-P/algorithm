const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [n, m] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" ").map(Number));

function solution(n, m, board) {
  class Queue {
    array = [];
    head = 0;
    tail = 0;
    enqueue(value) {
      this.array[this.tail] = value;
      this.tail += 1;
    }
    dequeue() {
      const value = this.array[this.head];
      this.head += 1;
      return value;
    }
    isEmpty() {
      return this.tail - this.head === 0;
    }
  }

  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  const visited = Array.from(Array(n), () => Array(m).fill(false));

  const outOfBound = (r, c) => r < 0 || n <= r || c < 0 || m <= c;
  const bfs = (r, c) => {
    const queue = new Queue();
    queue.enqueue([r, c]);
    visited[r][c] = true;
    let count = 1;

    while (!queue.isEmpty()) {
      const [curR, curC] = queue.dequeue();
      for (let direction = 0; direction < 4; direction++) {
        const nextR = curR + dr[direction];
        const nextC = curC + dc[direction];

        if (
          outOfBound(nextR, nextC) ||
          visited[nextR][nextC] ||
          board[nextR][nextC] === 0
        ) {
          continue;
        }

        visited[nextR][nextC] = true;
        count += 1;
        queue.enqueue([nextR, nextC]);
      }
    }

    return count;
  };

  let areaCount = 0;
  let max = 0;
  board.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (col === 1 && !visited[rowIndex][colIndex]) {
        max = Math.max(max, bfs(rowIndex, colIndex));
        areaCount += 1;
      }
    });
  });

  return [areaCount, max];
}
console.log(solution(n, m, board).join("\n"));
