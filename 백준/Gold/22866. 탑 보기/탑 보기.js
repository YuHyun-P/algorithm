const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, heightArray) {
  const [N_BUILDING, CLOSE_BUILDING] = [0, 1];

  let stack = [];
  const result = Array.from(Array(N), () => [0, Infinity]);
  const reversedHightArray = [...heightArray].reverse();

  const closest = (indexBase, indexA, indexB) => {
    const diffA = Math.abs(indexBase - indexA);
    const diffB = Math.abs(indexBase - indexB);
    if (diffA < diffB) {
      return indexA;
    }
    if (diffA === diffB) {
      return Math.min(indexA, indexB);
    }
    return indexB;
  };

  heightArray.forEach((height, index) => {
    while (stack.length && heightArray[stack.at(-1)] <= height) {
      stack.pop();
    }

    if (!stack.length) {
      stack.push(index);
      return;
    }

    result[index][N_BUILDING] += stack.length;
    result[index][CLOSE_BUILDING] = stack.at(-1);
    stack.push(index);
  });

  stack = [];
  reversedHightArray.forEach((height, offset) => {
    const index = N - offset - 1;
    while (stack.length && heightArray[stack.at(-1)] <= height) {
      stack.pop();
    }

    if (!stack.length) {
      stack.push(index);
      return;
    }

    result[index][N_BUILDING] += stack.length;
    result[index][CLOSE_BUILDING] = closest(
      index,
      result[index][CLOSE_BUILDING],
      stack.at(-1)
    );
    stack.push(index);
  });

  return result
    .map(([nBuilding, closeBuilding]) =>
      `${nBuilding} ${
        closeBuilding !== Infinity ? closeBuilding + 1 : ""
      }`.trim()
    )
    .join("\n");
}

const N = Number(input.shift());
const heightArray = input.shift().split(" ").map(Number);
console.log(solution(N, heightArray));
