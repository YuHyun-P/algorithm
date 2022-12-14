const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const totalTestCase = Number(input.shift().trim());
const createAC = (initialArray) => {
  const array = [...initialArray];
  let left = 0;
  let right = initialArray.length;
  let reversed = false;

  const R = () => {
    reversed = !reversed;
  };
  const D = () => {
    if (isEmpty()) {
      throw new Error("Empty array");
    }

    if (reversed) {
      right -= 1;
      return;
    }

    left += 1;
  };
  const isEmpty = () => {
    return left === right;
  };
  const getArray = () => {
    return reversed
      ? array.slice(left, right).reverse()
      : array.slice(left, right);
  };

  return { R, D, getArray };
};

const answers = Array(totalTestCase).fill("");
for (let testCase = 0; testCase < totalTestCase; testCase++) {
  const [commands, n, arrayString] = input
    .splice(0, 3)
    .map((string) => string.trim());

  const AC = createAC(JSON.parse(arrayString));
  try {
    commands.split("").forEach((command) => AC[command]());
    answers[testCase] = JSON.stringify(AC.getArray());
  } catch (error) {
    answers[testCase] = "error";
  }
}

console.log(answers.join("\n"));
