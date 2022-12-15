const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M] = input.shift().trim().split(" ").map(Number);
const [truthNum, ...truth] = input.shift().trim().split(" ").map(Number);
if (truthNum === 0) {
  console.log(M);
  return;
}

const truthPeople = new Set(truth);
let lieParty = input.map((line) => {
  const [count, ...people] = line.trim().split(" ").map(Number);
  return people;
});

for (let iter = 0; iter < M; iter++) {
  if (lieParty.length === 0) {
    break;
  }

  lieParty = lieParty.filter((people) => {
    const isTruthParty = people.some((person) => truthPeople.has(person));
    if (isTruthParty) {
      people.forEach((person) => truthPeople.add(person));
    }
    return !isTruthParty;
  });
}

console.log(lieParty.length);
