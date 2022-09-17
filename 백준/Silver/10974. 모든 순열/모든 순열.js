let fs = require("fs");
const N = Number(fs.readFileSync("/dev/stdin").toString().trim());

const getPermutations = (arr, selectedNumber) => {
  if (selectedNumber === 1) return arr.map((num) => [num]);

  const results = [];

  arr.forEach((fixed) => {
    const rest = arr.filter((num) => num !== fixed);
    const permutations = getPermutations(rest, selectedNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
};

const permutations = getPermutations(
  Array.from(Array(N), (_, index) => index + 1),
  N
);
permutations.forEach((permutation) => console.log(permutation.join(" ")));
