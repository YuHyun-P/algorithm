const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M) {
  const combinations = [];
  const backtracking = (last, path, length) => {
    if (length === M) {
      combinations.push(path.join(" "));
      return;
    }

    for (let next = last + 1; next < N + 1; next++) {
      path.push(next);
      backtracking(next, path, length + 1);
      path.pop();
    }
  };
  backtracking(0, [], 0);
  return combinations.join("\n");
}

const [N, M] = input[0].trim().split(" ").map(Number);
console.log(solution(N, M));
