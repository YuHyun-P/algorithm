const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0].trim());
const meeting = (() => {
  const meeting = [];

  for (let line = 1; line < 1 + N; line++) {
    const [start, end] = input[line].trim().split(" ").map(Number);
    meeting.push([start, end]);
  }
  meeting.sort(([startA, endA], [startB, endB]) => {
    const diffEnd = endA - endB;
    const diffStart = startA - startB;

    return diffEnd !== 0 ? diffEnd : diffStart;
  });

  return meeting;
})();

let lastEndTime = 0;
let count = 0;

meeting.forEach(([start, end]) => {
  if (lastEndTime > start) return;

  lastEndTime = end;
  count++;
  return;
});

console.log(count);
