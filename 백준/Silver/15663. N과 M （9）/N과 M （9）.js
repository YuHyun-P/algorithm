const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, sequence) {
  sequence.sort((a, b) => a - b);
  const answer = [];
  const path = [];
  const visited = Array(N).fill(false);

  const backtracking = (level) => {
    if (level === M) {
      answer.push(path.join(" "));
      return;
    }

    let tmp = 0;
    for (let index = 0; index < N; index++) {
      if (visited[index] || tmp === sequence[index]) {
        continue;
      }

      visited[index] = true;
      path[level] = tmp = sequence[index];
      backtracking(level + 1);
      visited[index] = false;
    }
  };

  backtracking(0);
  return [...answer].join("\n");
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const sequence = input[0].trim().split(" ").map(Number);
console.log(solution(N, M, sequence));

// reference https://github.com/encrypted-def/basic-algo-lecture/blob/master/0x0C/solutions/15663.cpp
