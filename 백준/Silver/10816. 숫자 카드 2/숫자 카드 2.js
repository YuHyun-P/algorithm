const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(seqN, seqM) {
  seqN.sort((a, b) => a - b);
  const countSeqN = (() => {
    const map = new Map();
    seqN.forEach((num) => {
      map.set(num, (map.get(num) ?? 0) + 1);
    });
    return [...map];
  })();

  const getCount = (left, right, sequence, k) => {
    if (left >= right) {
      return 0;
    }

    const mid = Math.floor((left + right) / 2);
    const diff = Math.sign(sequence[mid][0] - k);
    switch (diff) {
      case 0:
        return sequence[mid][1];
      case -1:
        return getCount(mid + 1, right, sequence, k);
      case 1:
        return getCount(left, mid, sequence, k);
    }
  };

  return seqM.map((num) => getCount(0, countSeqN.length, countSeqN, num));
}

const [seqN, seqM] = [input[1], input[3]].map((row) =>
  row.trim().split(" ").map(Number)
);
console.log(solution(seqN, seqM).join(" "));
