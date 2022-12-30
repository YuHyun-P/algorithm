const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(tower) {
  const benchmarking = Array(tower.length).fill(0);
  const rest = [];
  for (let cur = tower.length - 1; 0 <= cur; cur--) {
    while (rest.length) {
      const prev = rest.pop();
      if (tower[prev] >= tower[cur]) {
        rest.push(prev);
        break;
      }

      benchmarking[cur] += 1 + benchmarking[prev];
    }
    rest.push(cur);
  }

  return benchmarking.reduce((acc, cur) => acc + cur, 0);
}

input.shift();
const tower = input.map((row) => Number(row.trim()));
console.log(solution(tower));
