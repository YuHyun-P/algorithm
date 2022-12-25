const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split("").map(Number));

function solution(N, M, board) {
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
  class Queue {
    head = 0;
    tail = 0;
    array = [];
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
  const outOfBound = (r, c) => r < 0 || N <= r || c < 0 || M <= c;
  const bfs = (start) => {
    const distance = board.map((row) =>
      row.map((col) => (col === 1 ? -1 : Infinity))
    );
    const queue = new Queue();
    queue.enqueue(start);
    distance[start[0]][start[1]] = 1;

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

  const distanceFromStart = bfs([0, 0]);
  const distanceFromEnd = bfs([N - 1, M - 1]);
  let min = Math.min(distanceFromStart[N - 1][M - 1], Infinity);

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (board[row][col] === 0) {
        continue;
      }

      let minFromStart = Infinity;
      let minFromEnd = Infinity;
      for (let direction = 0; direction < 4; direction++) {
        const adjacentR = row + dr[direction];
        const adjacentC = col + dc[direction];

        if (
          outOfBound(adjacentR, adjacentC) ||
          board[adjacentR][adjacentC] === 1
        ) {
          continue;
        }

        if (distanceFromStart[adjacentR][adjacentC] !== Infinity) {
          minFromStart = Math.min(
            minFromStart,
            distanceFromStart[adjacentR][adjacentC]
          );
        }

        if (distanceFromEnd[adjacentR][adjacentC] !== Infinity) {
          minFromEnd = Math.min(
            minFromEnd,
            distanceFromEnd[adjacentR][adjacentC]
          );
        }
      }

      if (minFromEnd === Infinity || minFromEnd === Infinity) {
        continue;
      }

      min = Math.min(min, minFromStart + 1 + minFromEnd);
    }
  }

  return min;
}
const answer = solution(N, M, board);
console.log(answer !== Infinity ? answer : -1);
