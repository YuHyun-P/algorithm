const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const S = input[0].trim();
const q = Number(input[1].trim());
const requestArr = input.slice(2, 2 + q).map((line) =>
  line
    .trim()
    .split(" ")
    .map((input, index) => (index === 0 ? input : Number(input)))
);

const getIndex = (char) => String(char).charCodeAt(0) - "a".charCodeAt(0);

const prefixSum = Array.from(Array(26), () => Array(S.length + 1).fill(0));
[...S].forEach((char, index) => {
  const alphabet = getIndex(char);

  prefixSum[alphabet][index + 1] = 1;
});

for (let row = 0; row < prefixSum.length; row++) {
  for (let col = 1; col < prefixSum[row].length; col++) {
    prefixSum[row][col] += prefixSum[row][col - 1];
  }
}

console.log(
  requestArr
    .map(([char, from, to]) => {
      const alphabet = getIndex(char);

      return prefixSum[alphabet][to + 1] - prefixSum[alphabet][from];
    })
    .reduce((acc, cur) => acc + "\n" + cur, "")
    .trim()
);
