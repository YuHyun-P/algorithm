const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, ingredient, target) {
  const PAD = 1;
  const [PROTEIN, FAT, CARBOHYDRATE, VITAMIN, PRICE] = [0, 1, 2, 3, 4];
  let min = Infinity;
  let minIngredient;

  const isSatisfied = (nutrients) =>
    target.every((cur, index) => cur <= nutrients[index]);
  const compare = (selectedA, selectedB) => {
    const length = Math.min(selectedA.length, selectedB.length);
    for (let i = 0; i < length; i++) {
      if (selectedA[i] === selectedB[i]) continue;
      return selectedA[i] - selectedB[i];
    }
    return selectedA.length - selectedB.length;
  };
  const dfs = (index, selected, total) => {
    if (index === N) {
      if (isSatisfied(total)) {
        if (total[PRICE] > min) return;
        if (total[PRICE] === min && compare(selected, minIngredient) >= 0)
          return;
        min = total[PRICE];
        minIngredient = [...selected];
      }
      return;
    }

    if (min < total[PRICE]) return;

    selected.push(index + PAD);
    ingredient[index].forEach((value, i) => (total[i] += value));
    dfs(index + 1, selected, total);
    ingredient[index].forEach((value, i) => (total[i] -= value));
    selected.pop();

    dfs(index + 1, selected, total);
  };
  dfs(0, [], Array(ingredient[0].length).fill(0));

  return min === Infinity ? -1 : [min, minIngredient.join(" ")].join("\n");
}

const N = Number(input.shift());
const target = input
  .shift()
  .split(" ")
  .map((row) => row.split(" ").map(Number));
const ingredient = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, ingredient, target));
