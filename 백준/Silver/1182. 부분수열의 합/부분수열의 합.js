const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, S, array) {
  let subsetCount = 0;

  const backtracking = (total, selectedIndex) => {
    if (total === S && selectedIndex >= 0) {
      subsetCount += 1;
    }

    for (let index = selectedIndex + 1; index < N; index++) {
      backtracking(total + array[index], index);
    }
  };

  backtracking(0, -1);
  return subsetCount;
}

const [N, S] = input.shift().trim().split(" ").map(Number);
const array = input[0].split(" ").map(Number);
console.log(solution(N, S, array));
