const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, range) {
  const MAX = 2147483647;

  const countLess = (cur) =>
    range.reduce(
      (acc, [start, end, step]) =>
        acc +
        (cur < start ? 0 : Math.floor((Math.min(cur, end) - start) / step) + 1),
      0
    );

  let left = 0;
  let right = MAX;
  while (left < right - 1) {
    const mid = Math.floor((left + right) / 2);

    if (countLess(mid) % 2 === 1) right = mid;
    else left = mid;
  }

  const nLess = countLess(right);
  return nLess % 2 === 1
    ? [right, nLess - countLess(right - 1)].join(" ")
    : "NOTHING";
}

const N = Number(input.shift());
const range = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, range));
