const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, sequence) {
  const answer = [];
  sequence.sort((a, b) => a - b);

  const backtracking = (path, level) => {
    if (level === M) {
      answer.push(path.join(" "));
      return;
    }

    for (let index = 0; index < N; index++) {
      path.push(sequence[index]);
      backtracking(path, level + 1);
      path.pop();
    }
  };
  backtracking([], 0);
  return answer.join("\n");
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(N, M, sequence));
