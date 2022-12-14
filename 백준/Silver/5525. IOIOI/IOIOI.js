const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M, S] = input.map((line) => line.trim());
console.log(
  [...S.matchAll(/(IO)+I/g)]
    .map(([matched]) => Math.floor((matched.length - (N * 2 + 1 - 2)) / 2))
    .filter((count) => count > 0)
    .reduce((acc, cur) => acc + cur, 0)
);
