const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution([N, M]) {
  const answer = [];
  for (let iter = 0; iter < N ** M; iter++) {
    let cur = iter;
    let permutationRepetition = "";

    for (let division = 0; division < M; division++) {
      permutationRepetition =
        `${Math.floor(cur % N) + 1} ` + permutationRepetition;
      cur /= N;
    }

    answer.push(permutationRepetition);
  }
  return answer.join("\n");
}

console.log(solution(input[0].trim().split(" ").map(Number)));
