const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, sequence) {
  sequence.sort((a, b) => a - b);
  const answer = [];
  const path = Array(M).fill(0);

  const backtracking = (last, level) => {
    if (level === M) {
      answer.push(path.join(" "));
      return;
    }

    let prev = 0;
    for (let index = last; index < N; index++) {
      if (prev === sequence[index]) {
        continue;
      }

      path[level] = prev = sequence[index];
      backtracking(index, level + 1);
    }
  };

  backtracking(0, 0);
  return answer.join("\n");
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(N, M, sequence));
