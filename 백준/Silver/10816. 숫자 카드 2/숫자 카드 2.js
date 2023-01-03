const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(seqN, seqM) {
  const getLowerIndex = (left, right, sequence, k) => {
    if (left === right) {
      return left;
    }

    const mid = Math.floor((left + right) / 2);
    const diff = Math.sign(sequence[mid] - k);
    switch (diff) {
      case -1:
        return getLowerIndex(mid + 1, right, sequence, k);
      case 0:
      case 1:
        return getLowerIndex(left, mid, sequence, k);
    }
  };
  seqN.sort((a, b) => a - b);
  return seqM.map(
    (num) =>
      getLowerIndex(0, seqN.length, seqN, num + 1) -
      getLowerIndex(0, seqN.length, seqN, num)
  );
}

const [seqN, seqM] = [input[1], input[3]].map((row) =>
  row.trim().split(" ").map(Number)
);
console.log(solution(seqN, seqM).join("\n"));
