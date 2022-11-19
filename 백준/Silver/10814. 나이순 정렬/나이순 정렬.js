const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const userArray = [];
for (let line = 1; line <= N; line++) {
  const [ageStr, name] = input[line].trim().split(" ");
  userArray.push([Number(ageStr), name]);
}

userArray.sort(sortFn);
console.log(
  userArray
    .map((user) => user.join(" "))
    .reduce((acc, cur) => (acc += `${cur}\n`), "")
    .trim()
);

function sortFn(userA, userB) {
  const [ageA] = userA;
  const [ageB] = userB;

  const dAge = ageA - ageB;
  return dAge;
}
