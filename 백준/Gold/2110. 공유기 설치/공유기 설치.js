const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, C, house) {
  house.sort((a, b) => a - b);
  const check = (k) => {
    let selected = 1;
    let prev = 0;
    let next = prev + 1;
    while (prev < N) {
      while (next < N && house[next] - house[prev] < k) {
        next += 1;
      }

      if (next === N) {
        break;
      }

      prev = next;
      next = prev + 1;
      selected += 1;
    }

    return selected >= C;
  };

  let left = 0;
  let right = house.at(-1);
  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);
    if (check(mid)) left = mid;
    else right = mid;
  }
  return left;
}

const [N, C] = input.shift().trim().split(" ").map(Number);
const house = input.map((row) => Number(row.trim()));
console.log(solution(N, C, house));
