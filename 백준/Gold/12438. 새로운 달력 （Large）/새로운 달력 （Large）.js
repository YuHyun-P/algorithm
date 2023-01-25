const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, testCase) {
  const calc = (line, index) => {
    const [m2y, d2m, d2w] = line.trim().split(" ").map(Number);

    const trailing = d2m % d2w;
    const cycle = [trailing];
    while (cycle.at(-1) !== 0) {
      cycle.push((trailing * (cycle.length + 1)) % d2w);
    }

    const cycleRow = Array(cycle.length);
    for (let i = 0; i < cycle.length; i++) {
      cycleRow[i] = Math.ceil((d2m + (cycle[i - 1] ?? 0)) / d2w);
    }

    const cycleRowTotal = cycleRow.reduce((acc, cur) => acc + cur, 0);
    let row = BigInt(Math.floor(m2y / cycle.length)) * BigInt(cycleRowTotal);
    for (let i = 0; i < m2y % cycle.length; i++) {
      row += BigInt(cycleRow[i]);
    }
    return `Case #${index + 1}: ${row.toString()}`;
  };
  return testCase.map(calc).join("\n");
}

const T = Number(input.shift().trim());
console.log(solution(T, input));
