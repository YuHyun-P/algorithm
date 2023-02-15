const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(r, c, k, A) {
  const LIMIT = 100;
  const NUM = 0;
  const COUNT = 1;

  let t = 0;
  let curRow = A.length;
  let curCol = A[0].length;
  const paddedA = Array.from(Array(LIMIT), () => Array(LIMIT).fill(0));
  for (let row = 0; row < A.length; row++) {
    for (let col = 0; col < A[row].length; col++) {
      paddedA[row][col] = A[row][col];
    }
  }

  const sortFn = (a, b) => a[COUNT] - b[COUNT] || a[NUM] - b[NUM];
  const copy = (src, target) => {
    for (let row = 0; row < LIMIT; row++) {
      for (let col = 0; col < LIMIT; col++) {
        target[row][col] = src[row][col];
      }
    }
  };
  const C = () => {
    let maxRow = 0;
    let maxCol = 0;
    const tmp = Array.from(Array(LIMIT), () => Array(LIMIT).fill(0));

    for (let col = 0; col < LIMIT; col++) {
      const countArr = Array.from(Array(LIMIT + 1), (_, i) => [i, 0]);
      for (let row = 0; row < LIMIT; row++) {
        if (paddedA[row][col] === 0) continue;
        countArr[paddedA[row][col]][COUNT] += 1;
      }

      countArr.sort(sortFn);

      let row = 0;
      for (const [num, count] of countArr) {
        if (count === 0) continue;
        tmp[row++][col] = num;
        tmp[row++][col] = count;
        if (row === LIMIT) break;
      }
      maxRow = Math.max(maxRow, row);
      if (row > 0) maxCol = col + 1;
    }

    copy(tmp, paddedA);

    return [maxRow, maxCol];
  };
  const R = () => {
    let maxRow = 0;
    let maxCol = 0;
    const tmp = Array.from(Array(LIMIT), () => Array(LIMIT).fill(0));

    for (let row = 0; row < LIMIT; row++) {
      const countArr = Array.from(Array(LIMIT + 1), (_, i) => [i, 0]);
      for (let col = 0; col < LIMIT; col++) {
        if (paddedA[row][col] === 0) continue;
        countArr[paddedA[row][col]][COUNT] += 1;
      }

      countArr.sort(sortFn);

      let col = 0;
      for (const [num, count] of countArr) {
        if (count === 0) continue;
        tmp[row][col++] = num;
        tmp[row][col++] = count;
        if (col === LIMIT) break;
      }

      maxCol = Math.max(maxCol, col);
      if (col > 0) maxRow = row + 1;
    }

    copy(tmp, paddedA);

    return [maxRow, maxCol];
  };

  while (paddedA[r - 1][c - 1] !== k && t < LIMIT) {
    if (curRow >= curCol) [curRow, curCol] = R();
    else [curRow, curCol] = C();
    t += 1;
  }

  return paddedA[r - 1][c - 1] === k ? t : -1;
}

const [r, c, k] = input.shift().trim().split(" ").map(Number);
const A = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(r, c, k, A));
