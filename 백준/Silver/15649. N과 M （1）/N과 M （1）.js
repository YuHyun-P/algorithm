const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

const [N, M] = input.map(Number);
const oneToN = Array.from(Array(N), (_, index) => index + 1);

const getPermutations = (arr, selectedNumber) => {
  if (selectedNumber === 1) return arr.map((num) => [num]);

  const results = [];

  arr.forEach((fixed, fixedIndex) => {
    const rest = arr.filter((_, index) => index !== fixedIndex);
    const permutations = getPermutations(rest, selectedNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return [...new Set(results)];
};
console.log(
  getPermutations(oneToN, M)
    .map((permutation) => permutation.join(" "))
    .join("\n")
);
