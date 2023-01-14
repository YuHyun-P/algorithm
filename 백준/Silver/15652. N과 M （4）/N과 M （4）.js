const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M) {
  const answer = [];
  const backtracking = (last, path, level) => {
    if (level === M) {
      answer.push(path.join(" "));
      return;
    }

    for (let next = last; next < N + 1; next++) {
      path.push(next);
      backtracking(next, path, level + 1);
      path.pop();
    }
  };

  backtracking(1, [], 0);
  return answer.join("\n");
}

const [N, M] = input[0].trim().split(" ").map(Number);
console.log(solution(N, M));
