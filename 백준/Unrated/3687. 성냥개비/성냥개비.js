const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(query) {
  const MAX_N = 100;
  const count = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6];

  const minDp = Array(MAX_N + 1).fill("");
  const maxDp = Array(MAX_N + 1).fill("");

  const compare = (a, b) => {
    const maxLength = Math.max(a.length, b.length);
    const paddedA = a.padStart(maxLength, "0");
    const paddedB = b.padStart(maxLength, "0");

    if (paddedA === paddedB) return 0;
    return paddedA < paddedB ? -1 : 1;
  };
  const updateMin = (index, value) => {
    if (minDp[index] !== "" && compare(value, minDp[index]) >= 0) return;
    minDp[index] = value;
  };
  const updateMax = (index, value) => {
    if (maxDp[index] !== "" && compare(value, maxDp[index]) <= 0) return;
    maxDp[index] = value;
  };

  count.forEach((nStick, num) => {
    const cur = String(num);
    if (num === 0) return;

    updateMin(nStick, cur);
    updateMax(nStick, cur);
  });

  for (let n = 2; n < MAX_N + 1; n++) {
    for (const [num, nStick] of count.entries()) {
      if (n - nStick < 0) continue;

      const char = String(num);
      const prevMin = minDp[n - nStick];
      const prevMax = maxDp[n - nStick];

      if (prevMin) {
        let minPos =
          num === 0
            ? 1
            : [...prevMin].findIndex((value) => compare(char, value) <= 0);
        if (minPos < 0) minPos = prevMin.length;
        const nextMin = prevMin.slice(0, minPos) + char + prevMin.slice(minPos);
        updateMin(n, nextMin);
      }

      if (prevMax) {
        let maxPos =
          num === 0
            ? [...prevMax].length
            : [...prevMax].findIndex((value) => compare(char, value) >= 0);
        if (maxPos < 0) maxPos = prevMax.length;
        const nextMax = prevMax.slice(0, maxPos) + char + prevMax.slice(maxPos);
        updateMax(n, nextMax);
      }
    }
  }

  return query.map((n) => `${minDp[Number(n)]} ${maxDp[Number(n)]}`).join("\n");
}

input.shift();
console.log(solution(input));
