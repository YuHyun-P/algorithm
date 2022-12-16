const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const people = ["Inseo", "Junsuk", "Jungwoo", "Jinwoo", "Youngki"];
const nJob = 5;
const difficulty = input
  .splice(0, nJob)
  .map((line) => line.trim().split(" ").map(Number));
const processTime = input.map((line) => line.trim().split(" ").map(Number));
const expectTime = difficulty.map((difficultyX) =>
  difficultyX
    .map((_, y) =>
      difficultyX.reduce((acc, cur, i) => acc + cur * processTime[i][y], 0)
    )
    .reduce((acc, cur) => acc + cur, 0)
);
const minExpectTime = Math.min(...expectTime);
console.log(
  people[
    people.length -
      1 -
      expectTime.reverse().findIndex((value) => value === minExpectTime)
  ]
);
