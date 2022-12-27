const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split(" ");

function solution(N, M) {
  const getPermutations = (array, selectCount) => {
    if (selectCount === 1) {
      return array.map((num) => [num]);
    }

    return array.flatMap((selected, _, arr) =>
      getPermutations(
        arr.filter((num) => num !== selected),
        selectCount - 1
      ).map((permutation) => [selected, ...permutation])
    );
  };

  return getPermutations(
    Array.from(Array(N), (_, index) => index + 1),
    M
  );
}

const [N, M] = input.map(Number);
console.log(
  solution(N, M)
    .map((permutation) => permutation.join(" "))
    .join("\n")
);
