const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, testCase) {
  const isPossible = ([before, after]) => {
    if (before.length !== after.length) {
      return false;
    }

    const alphabet = Array.from(Array(26), () => [0, 0]);
    for (let index = 0; index < before.length; index++) {
      const beforeIndex = before.charCodeAt(index) - "a".charCodeAt(0);
      const afterIndex = after.charCodeAt(index) - "a".charCodeAt(0);

      alphabet[beforeIndex][0] += 1;
      alphabet[afterIndex][1] += 1;
    }

    return alphabet.every(
      ([beforeCount, afterCount]) => beforeCount === afterCount
    );
  };

  return testCase
    .map(isPossible)
    .map((result) => (result ? "Possible" : "Impossible"));
}

const T = Number(input.shift().trim());
const testCase = input.map((row) => row.trim().split(" "));
console.log(solution(T, testCase).join("\n"));
