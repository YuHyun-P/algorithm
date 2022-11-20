const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

const N = Number(input);
const answer = [];
recursiveMove(N, 1, 3, 2);
console.log(answer.length);
console.log(answer.map((path) => path.join(" ")).join("\n"));

function recursiveMove(n, source, target, temp) {
  if (n === 0) return;
  recursiveMove(n - 1, source, temp, target);
  move(source, target);
  recursiveMove(n - 1, temp, target, source);
}

function move(source, target) {
  answer.push([source, target]);
}
