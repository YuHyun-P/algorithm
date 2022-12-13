const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

const N = Number(input);
const factorial = Array.from(Array(N + 1), (_, index) => BigInt(index));
for (let index = 2; index < factorial.length; index++) {
  factorial[index] *= factorial[index - 1];
}

const zeroCount = [...factorial[N].toString()]
  .reverse()
  .findIndex((char) => char !== "0");
console.log(zeroCount >= 0 ? zeroCount : 0);
