const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const order = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const waitTimes = [];
order.forEach((processTime, index) => {
  waitTimes.push(index === 0 ? processTime : waitTimes.at(-1) + processTime);
});

console.log(waitTimes.reduce((acc, cur) => acc + cur, 0));
