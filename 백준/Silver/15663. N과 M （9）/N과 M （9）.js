const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, sequence) {
  sequence.sort((a, b) => a - b);
  const answer = new Set();
  const visited = Array(N).fill(false);

  const backtracking = (path, level) => {
    if (level === M) {
      answer.add(path.trimEnd());
      return;
    }

    for (let index = 0; index < N; index++) {
      if (visited[index]) {
        continue;
      }

      visited[index] = true;
      backtracking(path + `${sequence[index]} `, level + 1);
      visited[index] = false;
    }
  };

  backtracking("", 0);
  return [...answer].join("\n");
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(N, M, sequence));
