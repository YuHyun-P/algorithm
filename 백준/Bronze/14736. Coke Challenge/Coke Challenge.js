const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, totalCoke, coke] = input.shift().trim().split(" ").map(Number);
const nDrink = totalCoke / coke;
const participant = input.map((line) => line.trim().split(" ").map(Number));
console.log(
  Math.min(
    ...participant.map(
      ([tDrink, tRest]) => nDrink + (Math.ceil(nDrink / tDrink) - 1) * tRest
    )
  )
);
