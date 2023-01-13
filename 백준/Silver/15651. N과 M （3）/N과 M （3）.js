const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution([N, M]) {
  const answer = [];
  const backtracking = (path, level) => {
    if (level === M) {
      answer.push(path.join(" "));
      return;
    }

    for (let i = 1; i < N + 1; i++) {
      path.push(i);
      backtracking(path, level + 1);
      path.pop();
    }
  };

  backtracking([], 0);
  return answer.join("\n");
}

console.log(solution(input[0].trim().split(" ").map(Number)));
