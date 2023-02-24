const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(S, E, Q, history) {
  const TIME = 0;

  let count = 0;
  const enter = new Set();
  history.sort((a, b) => a[TIME] - b[TIME]);

  const isBeforeStart = (time) => time <= S;
  const isAfterEnd = (time) => E <= time && time <= Q;

  history.forEach(([time, id]) => {
    if (isBeforeStart(time) && !enter.has(id)) {
      enter.add(id);
    }
    if (isAfterEnd(time) && enter.has(id)) {
      enter.delete(id);
      count += 1;
    }
  });

  return count;
}

const [S, E, Q] = input
  .shift()
  .split(" ")
  .map((row) => {
    const [h, m] = row.trim().split(":").map(Number);
    return h * 60 + m;
  });
const history = input.map((row) => {
  const [t, id] = row.trim().split(" ");
  const [h, m] = t.split(":").map(Number);
  return [h * 60 + m, id];
});
console.log(solution(S, E, Q, history));
