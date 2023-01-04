const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const dr = [-2, -1, 1, 2, 2, 1, -1, -2];
  const dc = [1, 2, 2, 1, -1, -2, -2, -1];

  const outOfBound = (L, row, col) =>
    row < 0 || L <= row || col < 0 || L <= col;
  const getMin = ([L, [startRow, startCol], [targetRow, targetCol]]) => {
    const distance = Array.from(Array(L), () => Array(L).fill(-1));
    let head = 0;
    const queue = [[startRow, startCol]];
    distance[startRow][startCol] = 0;
    let found = false;

    while (queue.length - head && !found) {
      const [curRow, curCol] = queue[head++];

      for (let move = 0; move < dr.length; move++) {
        const nextRow = curRow + dr[move];
        const nextCol = curCol + dc[move];

        if (
          outOfBound(L, nextRow, nextCol) ||
          distance[nextRow][nextCol] !== -1
        ) {
          continue;
        }

        distance[nextRow][nextCol] = distance[curRow][curCol] + 1;
        if (nextRow === targetRow && nextCol === targetCol) {
          found = true;
          break;
        }

        queue.push([nextRow, nextCol]);
      }
    }

    return distance[targetRow][targetCol];
  };

  return testCase.map(getMin);
}

const T = Number(input.shift());
const testCase = [];
for (let t = 0; t < T; t++) {
  testCase.push([
    Number(input[t * 3].trim()),
    input[t * 3 + 1].trim().split(" ").map(Number),
    input[t * 3 + 2].trim().split(" ").map(Number),
  ]);
}
console.log(solution(testCase).join("\n"));
