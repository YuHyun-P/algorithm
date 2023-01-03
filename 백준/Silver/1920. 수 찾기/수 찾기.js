const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(sequenceN, sequenceM) {
  const ascending = (a, b) => a - b;
  const has = (left, right, sequence, k) => {
    if (left >= right) {
      return false;
    }

    const mid = Math.floor((left + right) / 2);
    const diff = Math.sign(sequence[mid] - k);
    switch (diff) {
      case 0:
        return true;
      case -1:
        return has(mid + 1, right, sequence, k);
      case 1:
        return has(left, mid, sequence, k);
    }
  };

  sequenceN.sort(ascending);

  return sequenceM.map((num) =>
    has(0, sequenceN.length, sequenceN, num) ? 1 : 0
  );
}

const [sequenceN, sequenceM] = [input[1], input[3]].map((row) =>
  row.trim().split(" ").map(Number)
);
console.log(solution(sequenceN, sequenceM).join("\n"));
