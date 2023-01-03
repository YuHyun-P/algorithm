const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const test = ([command, sequence]) => {
    let head = 0;
    let tail = sequence.length - 1;
    let isReversed = false;

    for (const char of command) {
      switch (char) {
        case "R":
          isReversed = !isReversed;
          break;
        case "D":
          if (head > tail) {
            return "error";
          }
          if (!isReversed) {
            head += 1;
          } else {
            tail -= 1;
          }
          break;
      }
    }

    return JSON.stringify(
      isReversed
        ? sequence.slice(head, tail + 1).reverse()
        : sequence.slice(head, tail + 1)
    );
  };

  return testCase.map(test);
}

const T = Number(input.shift());
const testCase = [];
for (let index = 0; index < T; index++) {
  const [p, n, sequence] = [
    input[index * 3],
    input[index * 3 + 1],
    input[index * 3 + 2],
  ];
  testCase.push([p.trim(), JSON.parse(sequence)]);
}
console.log(solution(testCase).join("\n"));
