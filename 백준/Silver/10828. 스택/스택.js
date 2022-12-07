const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].trim());

const stack = (() => {
  const array = [];

  const top = () => array.at(-1) ?? -1;
  const size = () => array.length;
  const empty = () => (size() === 0 ? 1 : 0);
  const push = (value) => {
    array.push(value);
  };
  const pop = () => array.pop() ?? -1;

  return {
    top,
    size,
    empty,
    push,
    pop,
  };
})();

let answers = "";
for (let line = 1; line < 1 + N; line++) {
  const [command, value] = input[line].trim().split(" ");
  const result = stack[command](Number(value));
  if (Number.isInteger(result)) {
    answers += "\n" + result;
  }
}

console.log(answers.trim());
