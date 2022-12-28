const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, village) {
  const HOUSE = 1;
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];
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

  const chicken = (() => {
    const chicken = [];
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (village[row][col] === 2) {
          chicken.push([chicken.length, row, col]);
        }
      }
    }
    return chicken;
  })();

  const visited = Array(chicken.length).fill(false);
  let minDistance = Infinity;

  const outOfBound = (r, c) => r < 0 || N <= r || c < 0 || N <= c;
  const calculateDistance = (index, row, col) => {
    const [_, chickenRow, chickenCol] = chicken[index];
    return Math.abs(row - chickenRow) + Math.abs(col - chickenCol);
  };
  const bfs = (chicken) => {
    let totalDistance = 0;
    const visited = Array.from(Array(N), () => Array(N).fill(false));
    const queue = new Queue();
    chicken.forEach((value) => {
      const [_, row, col] = value;
      queue.enqueue(value);
      visited[row][col] = true;
    });

    while (!queue.isEmpty()) {
      const [index, row, col] = queue.dequeue();

      for (let direction = 0; direction < 4; direction++) {
        const nextRow = row + dr[direction];
        const nextCol = col + dc[direction];
        if (outOfBound(nextRow, nextCol) || visited[nextRow][nextCol]) {
          continue;
        }

        visited[nextRow][nextCol] = true;
        if (village[nextRow][nextCol] === HOUSE) {
          totalDistance += calculateDistance(index, nextRow, nextCol);
        }

        queue.enqueue([index, nextRow, nextCol]);
      }
    }

    return totalDistance;
  };
  const backtracking = (selected, count) => {
    if (count === M) {
      const totalDistance = bfs(chicken.filter((_, index) => visited[index]));
      minDistance = Math.min(minDistance, totalDistance);
      return;
    }

    for (let next = selected + 1; next < visited.length; next++) {
      if (visited[next]) {
        continue;
      }

      visited[next] = true;
      backtracking(next, count + 1);
      visited[next] = false;
    }
  };

  backtracking(-1, 0);
  return minDistance;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const village = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, village));
