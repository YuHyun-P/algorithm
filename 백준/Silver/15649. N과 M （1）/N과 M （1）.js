const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N, M) {
  const permutations = [];
  const visited = Array(N).fill(false);

  const backtracking = (permutation, level) => {
    if (level === 0) {
      permutations.push([...permutation]);
      return;
    }

    visited.forEach((selected, index) => {
      if (selected) {
        return;
      }

      visited[index] = true;
      permutation.push(index + 1);

      backtracking(permutation, level - 1);

      permutation.pop();
      visited[index] = false;
    });
  };
  backtracking([], M);

  return permutations;
}

const [N, M] = input.map(Number);
console.log(
  solution(N, M)
    .map((permutation) => permutation.join(" "))
    .join("\n")
);
