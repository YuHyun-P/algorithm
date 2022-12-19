const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const countDiff = (source, target) =>
  [...source].filter((color, index) => color !== target[index]).length;
const countWhite = (othello) => (othello.match(/W/g) ?? []).length;

const totalTestCase = Number(input.shift());
const answer = Array(totalTestCase).fill(0);
for (let testCase = 0; testCase < totalTestCase; testCase++) {
  const [N, source, target] = input.splice(0, 3);

  const diff = countDiff(source.trim(), target.trim());
  if (diff === 0) {
    answer[testCase] = 0;
    continue;
  }

  const sourceW = countWhite(source);
  const targetW = countWhite(target);
  answer[testCase] =
    sourceW === targetW
      ? diff / 2
      : Math.abs(sourceW - targetW) + (diff - Math.abs(sourceW - targetW)) / 2;
}
console.log(answer.join("\n"));
