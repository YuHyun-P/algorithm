const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const totalTestCase = Number(input.shift().trim());
const createAC = (initialArray) => {
  const array = [...initialArray];
  let head = 0;
  let reversed = false;

  const R = () => {
    reversed = !reversed;
  };
  const D = () => {
    if (isEmpty()) {
      throw new Error("Empty array");
    }

    if (reversed) {
      return array.pop();
    }
    const item = array[head];
    head += 1;
    return item;
  };
  const isEmpty = () => {
    return array.length - head === 0;
  };
  const getArray = () => {
    return reversed ? array.splice(head).reverse() : array.splice(head);
  };

  return { R, D, getArray };
};

const answers = Array(totalTestCase).fill("");
for (let testCase = 0; testCase < totalTestCase; testCase++) {
  const [commands, n, arrayString] = input
    .splice(0, 3)
    .map((string) => string.trim());

  const AC = createAC(
    arrayString
      .slice(1, arrayString.length - 1)
      .split(",")
      .filter((num) => num !== "")
      .map(Number)
  );
  try {
    commands.split("").forEach((command) => AC[command]());
    answers[testCase] = `[${AC.getArray().toString()}]`;
  } catch (error) {
    answers[testCase] = "error";
  }
}

console.log(answers.join("\n"));
