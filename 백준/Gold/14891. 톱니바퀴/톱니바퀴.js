const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(gear, rotateList) {
  const THREE = 2;
  const NINE = -2;
  const head = Array(4).fill(0);
  let score = 0;

  const getSafe = (gearIndex, at) => gear[gearIndex][(at + 8) % 8];
  const rotate = (index, direction, visited) => {
    visited[index] = true;

    if (
      index !== 0 &&
      !visited[index - 1] &&
      getSafe(index - 1, head[index - 1] + THREE) !==
        getSafe(index, head[index] + NINE)
    ) {
      rotate(index - 1, -1 * direction, visited);
    }

    if (
      index !== 3 &&
      !visited[index + 1] &&
      getSafe(index, head[index] + THREE) !==
        getSafe(index + 1, head[index + 1] + NINE)
    ) {
      rotate(index + 1, -1 * direction, visited);
    }

    head[index] = (head[index] + -1 * direction + 8) % 8;
  };

  rotateList.forEach(([index, direction]) => {
    const visited = Array(4).fill(false);
    rotate(index - 1, direction, visited);
  });

  for (let index = 0; index < head.length; index++) {
    if (gear[index][head[index]] === 1) {
      score += 2 ** index;
    }
  }

  return score;
}

const gear = input.splice(0, 4).map((row) => row.trim().split("").map(Number));
input.shift();
const rotateList = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(gear, rotateList));
