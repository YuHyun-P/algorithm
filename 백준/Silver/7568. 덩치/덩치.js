const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const peopleInfo = [];
const rank = Array(N).fill(1);

for (let line = 1; line <= N; line++) {
  const [weight, height] = input[line].trim().split(" ").map(Number);
  peopleInfo.push([weight, height]);
}

for (let peopleA = 0; peopleA < peopleInfo.length - 1; peopleA++) {
  for (let peopleB = peopleA + 1; peopleB < peopleInfo.length; peopleB++) {
    if (peopleA === peopleB) continue;

    const [weightA, heightA] = peopleInfo[peopleA];
    const [weightB, heightB] = peopleInfo[peopleB];

    const dWeight = weightA - weightB;
    const dHeight = heightA - heightB;

    if (dWeight > 0 && dHeight > 0) {
      rank[peopleB]++;
    } else if (dWeight < 0 && dHeight < 0) {
      rank[peopleA]++;
    }
  }
}

console.log(rank.join(" "));
