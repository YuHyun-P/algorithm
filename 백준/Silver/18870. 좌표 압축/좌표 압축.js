const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(coord) {
  const sorted = [...new Set(coord)].sort((a, b) => a - b);
  const getLowerIndex = (sequence, k) => {
    let left = 0;
    let right = sequence.length;
    let mid = Math.floor((left + right) / 2);
    while (left < right) {
      const diff = Math.sign(sequence[mid] - k);
      switch (diff) {
        case -1:
          left = mid + 1;
          break;
        case 0:
        case 1:
          right = mid;
          break;
      }
      mid = Math.floor((left + right) / 2);
    }

    return left;
  };
  return coord.map((num) => getLowerIndex(sorted, num));
}

input.shift();
const coord = input[0].trim().split(" ").map(Number);
console.log(solution(coord).join(" "));
