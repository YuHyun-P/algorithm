const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(height) {
  let count = 0n;
  const stack = [];

  height.forEach((cur) => {
    let sameCount = 0;

    while (stack.length) {
      const [prev, prevCount] = stack.pop();

      if (cur < prev) {
        stack.push([prev, prevCount]);
        count += 1n;
        break;
      }

      count += BigInt(prevCount);
      if (prev === cur) {
        sameCount += prevCount;
      }
    }

    stack.push([cur, sameCount + 1]);
  });

  return count;
}

input.shift();
const height = input.map((row) => Number(row.trim()));
console.log(solution(height).toString());
