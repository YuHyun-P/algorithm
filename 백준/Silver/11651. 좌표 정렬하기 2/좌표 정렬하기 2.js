const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const coordArray = [];
for (let line = 1; line <= N; line++) {
  const coord = input[line].trim().split(" ").map(Number);
  coordArray.push(coord);
}

coordArray.sort(sortFn);

let answer = "";
coordArray
  .map((coord) => coord.join(" "))
  .forEach((coord) => (answer += `${coord}\n`));
console.log(answer.trim());

function sortFn(coordA, coordB) {
  const [xA, yA] = coordA;
  const [xB, yB] = coordB;

  const dy = yA - yB;
  const dx = xA - xB;

  return dy !== 0 ? dy : dx;
}
