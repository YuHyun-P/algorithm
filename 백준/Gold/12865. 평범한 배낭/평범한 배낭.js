const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(K, item) {
  const maxValue = Array.from(Array(item.length), () => Array(K + 1).fill(0));
  const outOfBound = (row, col) =>
    row < 0 || item.length <= row || col < 0 || K + 1 <= col;
  const getSafe = (row, col) => (outOfBound(row, col) ? 0 : maxValue[row][col]);

  for (let index = 0; index < maxValue.length; index++) {
    const [itemWeight, itemValue] = item[index];

    for (let weight = 0; weight < maxValue[index].length; weight++) {
      if (weight < itemWeight) {
        maxValue[index][weight] = getSafe(index - 1, weight) ?? 0;
        continue;
      }

      maxValue[index][weight] = Math.max(
        getSafe(index - 1, weight),
        getSafe(index - 1, weight - itemWeight) + itemValue
      );
    }
  }

  return maxValue[item.length - 1][K];
}

const [N, K] = input.shift().trim().split(" ").map(Number);
const item = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(K, item));
