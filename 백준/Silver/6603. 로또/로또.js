const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(query) {
  const HEIGHT = 6;
  const path = Array(HEIGHT).fill(0);

  const lotto = (k, sequence) => {
    sequence.sort((a, b) => a - b);
    const answer = [];

    const backtracking = (last, level) => {
      if (level === HEIGHT) {
        answer.push(path.join(" "));
        return;
      }
      for (let index = last + 1; index < k; index++) {
        path[level] = sequence[index];
        backtracking(index, level + 1);
      }
    };

    backtracking(-1, 0);
    return answer.join("\n");
  };

  return query
    .map((row) => {
      const [k, ...sequence] = row.trim().split(" ").map(Number);
      return lotto(k, sequence);
    })
    .join("\n\n");
}

input.pop();
console.log(solution(input));
