const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [R, C] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(""));

function solution(R, C, board) {
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
  const outOfBound = (r, c) => r < 0 || R <= r || c < 0 || C <= c;
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  const bfs = (start) => {
    const distance = board.map((row) =>
      row.map((col) => (col === "#" ? -1 : Infinity))
    );
    const queue = new Queue();
    start.forEach(([r, c]) => {
      queue.enqueue([r, c]);
      distance[r][c] = 1;
    });

    while (!queue.isEmpty()) {
      const [curR, curC] = queue.dequeue();

      for (let direction = 0; direction < 4; direction++) {
        const nextR = curR + dr[direction];
        const nextC = curC + dc[direction];

        if (outOfBound(nextR, nextC) || distance[nextR][nextC] !== Infinity) {
          continue;
        }

        distance[nextR][nextC] = distance[curR][curC] + 1;
        queue.enqueue([nextR, nextC]);
      }
    }

    return distance;
  };

  const fire = [];
  const J = [];
  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      switch (col) {
        case "F":
          fire.push([rowIndex, colIndex]);
          break;
        case "J":
          J.push([rowIndex, colIndex]);
          break;
      }
    })
  );

  const fireDistance = bfs(fire);
  const JDistance = bfs(J);

  let min = Infinity;

  JDistance.forEach((distanceArray, row) =>
    distanceArray.forEach((distance, col) => {
      if (0 < row && row < R - 1 && 0 < col && col < C - 1) {
        return;
      }

      if (
        distance !== -1 &&
        board[row][col] !== "F" &&
        distance < fireDistance[row][col]
      ) {
        min = Math.min(min, distance);
      }
    })
  );

  return min;
}
const answer = solution(R, C, board);
console.log(answer !== Infinity ? answer : "IMPOSSIBLE");
