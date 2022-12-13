const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input.shift());
const graph = (() => {
  const temp = [];
  for (let line = 0; line < N; line++) {
    temp.push(input[line].trim().split(" ").map(Number));
  }
  return temp;
})();
const count = [0, 0, 0];
const check = (startRow, startCol, N) => {
  const start = graph[startRow][startCol];
  if (N === 1) {
    count[start + 1] += 1;
    return;
  }

  for (let row = startRow; row < startRow + N; row++) {
    for (let col = startCol; col < startCol + N; col++) {
      if (graph[row][col] !== start) {
        for (
          let nextRow = startRow;
          nextRow < startRow + N;
          nextRow += Math.floor(N / 3)
        ) {
          for (
            let nextCol = startCol;
            nextCol < startCol + N;
            nextCol += Math.floor(N / 3)
          ) {
            check(nextRow, nextCol, Math.floor(N / 3));
          }
        }
        return;
      }
    }
  }
  count[start + 1] += 1;
};
check(0, 0, N);
console.log(count.join("\n"));
