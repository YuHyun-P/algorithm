const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim();

function solution(max, start, target, up, down) {
  const dHeight = [up, -down];
  const count = Array(max + 1).fill(-1);
  const outOfBound = (cur) => cur <= 0 || max < cur;
  const bfs = () => {
    let head = 0;
    const queue = [start];
    count[start] = 0;

    if (start === target) {
      return;
    }

    while (queue.length - head) {
      const cur = queue[head++];
      for (let move = 0; move < dHeight.length; move++) {
        const next = cur + dHeight[move];
        if (outOfBound(next) || count[next] !== -1) {
          continue;
        }

        count[next] = count[cur] + 1;
        queue.push(next);

        if (next === target) {
          return;
        }
      }
    }
  };
  bfs();

  return count[target] !== -1 ? count[target] : "use the stairs";
}

const [max, start, target, up, down] = input.split(" ").map(Number);
console.log(solution(max, start, target, up, down));
