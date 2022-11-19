const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const userArray = [];
for (let line = 1; line <= N; line++) {
  const [ageStr, name] = input[line].trim().split(" ");
  userArray.push([Number(ageStr), name, line]);
}

userArray.sort(sortFn);
console.log(
  userArray
    .map(([age, name]) => `${age} ${name}`)
    .reduce((acc, cur) => (acc += `${cur}\n`), "")
    .trim()
);

function sortFn(userA, userB) {
  const [ageA, _A, lineA] = userA;
  const [ageB, _B, lineB] = userB;

  const dAge = ageA - ageB;
  const dLine = lineA - lineB;

  return dAge !== 0 ? dAge : dLine;
}
