const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(sequence) {
  const has = (left, right, sequence, k) => {
    if (left >= right) {
      return false;
    }

    const mid = Math.floor((left + right) / 2);
    const diff = Math.sign(sequence[mid] - k);
    switch (diff) {
      case -1:
        return has(mid + 1, right, sequence, k);
      case 0:
        return true;
      case 1:
        return has(left, mid, sequence, k);
    }
  };

  sequence.sort((a, b) => a - b);
  let max = -1;
  while (sequence.length && max < 0) {
    const target = sequence.pop();

    for (let x = sequence.length - 1; 0 <= x && max < 0; x--) {
      for (let y = sequence.length - 1; 0 <= y; y--) {
        const z = target - sequence[x] - sequence[y];
        if (z <= 0 || z > sequence[y]) {
          continue;
        }

        if (has(0, x + 1, sequence, z)) {
          max = target;
          break;
        }
      }
    }
  }
  return max;
}

input.shift();
const sequence = input.flatMap((row) => Number(row.trim()));
console.log(solution(sequence));
