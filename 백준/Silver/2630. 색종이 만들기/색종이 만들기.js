const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].trim());
const paper = (() => {
  const temp = [];
  for (let line = 1; line < 1 + N; line++) {
    const row = input[line].trim().split(" ").map(Number);
    temp.push(row);
  }
  return temp;
})();
const visited = (() => {
  const visited = Array.from(Array(N), () => Array(N).fill(false));

  const visit = ([startRow, startCol], length) => {
    for (let row = startRow; row < startRow + length; row++) {
      for (let col = startCol; col < startCol + length; col++) {
        visited[row][col] = true;
      }
    }
  };

  const at = ([row, col]) => visited[row][col];

  return { visit, at };
})();

const getStartArray = (length, N) => {
  const startArray = [];
  for (let row = 0; row < N; row += length) {
    for (let col = 0; col < N; col += length) {
      startArray.push([row, col]);
    }
  }
  return startArray;
};

const isSquare = ([r, c], length, paper) => {
  let startColor = paper[r][c];
  for (let row = r; row < r + length; row++) {
    for (let col = c; col < c + length; col++) {
      if (paper[row][col] !== startColor) {
        return false;
      }
    }
  }
  return true;
};

const colorCount = [0, 0];
for (let length = N; length >= 1; length /= 2) {
  const startArray = getStartArray(length, N);
  startArray.forEach(([startR, startC]) => {
    if (visited.at([startR, startC])) {
      return;
    }

    if (isSquare([startR, startC], length, paper)) {
      const startColor = paper[startR][startC];
      colorCount[startColor] += 1;
      visited.visit([startR, startC], length);
    }
  });
}
console.log(colorCount.join("\n"));
