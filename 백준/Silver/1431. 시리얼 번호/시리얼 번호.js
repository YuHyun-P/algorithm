const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(serialNumber) {
  const sumDigits = (word) => {
    return [...word]
      .filter((char) => Number.isInteger(Number(char)))
      .reduce((acc, cur) => acc + Number(cur), 0);
  };
  const sortFn = (a, b) => {
    const dLength = a.length - b.length;
    if (dLength !== 0) {
      return dLength;
    }

    const dSumDigits = sumDigits(a) - sumDigits(b);
    if (dSumDigits !== 0) {
      return dSumDigits;
    }

    return a < b ? -1 : 1;
  };

  serialNumber.sort(sortFn);

  return serialNumber;
}

input.shift();
const serialNumber = input.map((row) => row.trim());
console.log(solution(serialNumber).join("\n"));
