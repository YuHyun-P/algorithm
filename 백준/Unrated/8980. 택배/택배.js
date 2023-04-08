const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, C, M, info) {
  const [from, to, box] = [0, 1, 2];

  let city = 1;
  let rest = C;
  const truck = Array(N + 1).fill(0);
  info.sort((a, b) => a[from] - b[from] || a[to] - b[to]);

  const clear = (until) => {
    while (city < until) {
      city += 1;
      rest += truck[city];
    }
  };
  const drop = (to, box) => {
    let target = to + 1;
    while (rest < box && target < N + 1) {
      if (truck[target] !== 0) {
        const pick = Math.min(box, truck[target]);
        truck[target] -= pick;
        rest += pick;
      }
      target += 1;
    }
  };

  info.forEach(([from, to, box]) => {
    if (city !== from) {
      clear(from);
      drop();
    }
    if (rest === 0) return;

    const pick = Math.min(rest, box);
    truck[to] += pick;
    rest -= pick;
  });

  return truck.reduce((acc, cur) => acc + cur, 0);
}

const [N, C] = input.shift().split(" ").map(Number);
const M = Number(input.shift());
const info = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, C, M, info));
