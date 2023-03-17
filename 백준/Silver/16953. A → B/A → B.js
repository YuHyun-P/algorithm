const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(A, B) {
  let minCount = -1;
  let head = 0;
  const visited = new Set().add(A);
  const queue = [[A, 0]];
  const opList = [(x) => x * 2, (x) => x * 10 + 1];

  while (queue.length - head && minCount < 0) {
    const [cur, count] = queue[head++];

    for (const op of opList) {
      const next = op(cur);
      if (visited.has(next) || next > B) continue;

      visited.add(next);
      queue.push([next, count + 1]);

      if (next === B) {
        minCount = count + 1;
        break;
      }
    }
  }

  return minCount > 0 ? minCount + 1 : minCount;
}

const [A, B] = input[0].trim().split(" ").map(Number);
console.log(solution(A, B));
