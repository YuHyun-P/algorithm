const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, sequence) {
  sequence.sort((a, b) => a - b);
  const answer = [];

  const backtracking = (path, level) => {
    if (level === M) {
      answer.push(path.trim());
      return;
    }

    let prev = 0;
    for (let index = 0; index < N; index++) {
      if (prev === sequence[index]) {
        continue;
      }

      prev = sequence[index];
      backtracking(`${path} ${sequence[index]}`, level + 1);
    }
  };

  backtracking("", 0);
  return answer.join("\n");
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(N, M, sequence));
