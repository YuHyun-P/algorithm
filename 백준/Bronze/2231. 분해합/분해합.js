const fs = require("fs");
const N = Number(fs.readFileSync("/dev/stdin").toString().trim());

let min = Infinity;
for (let curN = 1; curN <= N; ++curN) {
  const M = getM(curN);
  if (M === N) {
    min = Math.min(min, curN);
  }
}
console.log(min === Infinity ? 0 : min);

function getM(N) {
  return N + [...N.toString()].reduce((acc, cur) => acc + Number(cur), 0);
}
