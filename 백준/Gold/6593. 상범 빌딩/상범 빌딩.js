const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const dl = [0, 0, 0, 0, 1, -1];
  const dr = [0, 1, 0, -1, 0, 0];
  const dc = [1, 0, -1, 0, 0, 0];

  const getInitialState = (L, R, C, board) => {
    const distance = Array.from(Array(L), () =>
      Array.from(Array(R), () => Array(C).fill(-1))
    );
    let start = null;
    let target = null;
    for (let layer = 0; layer < L; layer++) {
      for (let row = 0; row < R; row++) {
        for (let col = 0; col < C; col++) {
          switch (board[layer][row][col]) {
            case "S":
              start = [layer, row, col];
              break;
            case "E":
              target = [layer, row, col];
              break;
            case "#":
              distance[layer][row][col] = Infinity;
              break;
          }
        }
      }
    }
    return { distance, start, target };
  };

  const getMin = ([[L, R, C], board]) => {
    const { distance, start, target } = getInitialState(L, R, C, board);
    const outOfBound = (layer, row, col) =>
      layer < 0 || row < 0 || col < 0 || L <= layer || R <= row || C <= col;
    const bfs = () => {
      const [startLayer, startRow, startCol] = start;
      const [targetLayer, targetRow, targetCol] = target;
      let head = 0;
      const queue = [start];
      distance[startLayer][startRow][startCol] = 0;

      while (queue.length - head) {
        const [layer, row, col] = queue[head++];

        for (let move = 0; move < dl.length; move++) {
          const nextLayer = layer + dl[move];
          const nextRow = row + dr[move];
          const nextCol = col + dc[move];

          if (
            outOfBound(nextLayer, nextRow, nextCol) ||
            distance[nextLayer][nextRow][nextCol] === Infinity ||
            distance[nextLayer][nextRow][nextCol] !== -1
          ) {
            continue;
          }

          distance[nextLayer][nextRow][nextCol] = distance[layer][row][col] + 1;
          queue.push([nextLayer, nextRow, nextCol]);

          if (
            nextLayer === targetLayer &&
            nextRow === targetRow &&
            nextCol === targetCol
          ) {
            return distance[nextLayer][nextRow][nextCol];
          }
        }
      }

      return -1;
    };

    return bfs();
  };

  return testCase
    .map(getMin)
    .map((min) => (min !== -1 ? `Escaped in ${min} minute(s).` : "Trapped!"));
}

const testCase = [];
let layer = 0;

input.forEach((line) => {
  const trimmed = line.trim();
  if (trimmed === "0 0 0") {
    return;
  }

  if (trimmed === "") {
    layer += 1;
    return;
  }

  if (trimmed.split(" ").length === 3) {
    layer = 0;
    const [L, R, C] = trimmed.split(" ").map(Number);
    testCase.push([[L, R, C], Array.from(Array(L), () => [])]);
    return;
  }

  testCase.at(-1)[1][layer].push(trimmed.split(""));
});
console.log(solution(testCase).join("\n"));
