const fs = require("fs");
const S = fs.readFileSync("/dev/stdin").toString().trim();
const subSet = new Set();

[...S].forEach((_, index) => addSubS(S, index, index + 1));
console.log(subSet.size);

function addSubS(S, startIdx, endIdx) {
  if (endIdx > S.length) return;

  subSet.add(S.substring(startIdx, endIdx));
  addSubS(S, startIdx, endIdx + 1);
}
