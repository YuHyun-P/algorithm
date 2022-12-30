const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(tower) {
  const receive = Array(tower.length).fill(0);
  const rest = [];

  for (let cur = tower.length - 1; 0 <= cur; cur--) {
    while (rest.length) {
      const [prev, index] = rest.pop();
      if (tower[cur] < prev) {
        rest.push([prev, index]);
        break;
      }
      receive[index] = cur + 1;
    }
    rest.push([tower[cur], cur]);
  }
  return receive;
}

input.shift();
const tower = input[0].trim().split(" ").map(Number);
console.log(solution(tower).join(" "));
