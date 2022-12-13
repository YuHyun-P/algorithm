const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input[0]);
const operator = (() => {
  const result = [];
  for (let i = 1; i < 1 + N; i++) {
    result.push(input[i].trim().split(" "));
  }
  return result;
})();
const queue = (() => {
  const array = [];
  let head = 0;

  const push = (x) => {
    array.push(x);
  };
  const front = () => (size() !== 0 ? array[head] : -1);
  const back = () => (size() !== 0 ? array.at(-1) : -1);
  const size = () => array.length - head;
  const empty = () => (size() === 0 ? 1 : 0);
  const pop = () => (size() === 0 ? -1 : array[head++]);

  return {
    push,
    pop,
    front,
    back,
    size,
    empty,
  };
})();

console.log(
  operator
    .map(([op, value]) => queue[op](Number(value)))
    .filter((result) => result !== undefined)
    .join("\n")
);
