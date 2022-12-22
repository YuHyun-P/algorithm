const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input.shift().trim());
const queue = (() => {
  const array = [];
  let head = 0;
  let tail = 0;

  const push = (value) => {
    array.push(value);
    tail += 1;
  };
  const front = () => {
    return array[head] ?? -1;
  };
  const pop = () => {
    const value = front();
    if (value !== -1) {
      head++;
    }
    return value;
  };
  const size = () => {
    return tail - head;
  };
  const back = () => {
    return size() !== 0 ? array[tail - 1] : -1;
  };

  const empty = () => {
    return size() === 0 ? 1 : 0;
  };

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
  input
    .map((line) => {
      const [command, value] = line.trim().split(" ");
      return queue[command](Number(value));
    })
    .filter(Number.isInteger)
    .join("\n")
);
