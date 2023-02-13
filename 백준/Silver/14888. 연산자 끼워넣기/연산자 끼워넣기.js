const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, A, ops) {
  let min = Infinity;
  let max = -Infinity;

  const fn = [
    (acc, cur) => acc + cur,
    (acc, cur) => acc - cur,
    (acc, cur) => acc * cur,
    (acc, cur) => Math.floor(Math.abs(acc) / cur) * Math.sign(acc),
  ];

  const dfs = (cur, level, ops, path) => {
    if (level === N) {
      min = Math.min(cur, min);
      max = Math.max(cur, max);
      return;
    }

    for (let next = 0; next < fn.length; next++) {
      if (ops[next] === 0) continue;
      ops[next] -= 1;
      dfs(fn[next](cur, A[level]), level + 1, ops);
      ops[next] += 1;
    }
  };

  dfs(A[0], 1, ops);
  return `${max}\n${min}`;
}

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const ops = input[2].split(" ").map(Number);
console.log(solution(N, A, ops));
