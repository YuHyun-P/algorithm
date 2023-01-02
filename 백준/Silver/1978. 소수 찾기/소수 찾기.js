const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(arr) {
  const isPrime = (num) => {
    if (num <= 1) {
      return false;
    }
    if (num === 2) {
      return true;
    }

    for (let n = 2; n * n <= num; n++) {
      if (num % n === 0) {
        return false;
      }
    }
    return true;
  };
  return arr.filter(isPrime).length;
}

const N = Number(input.shift());
const arr = input[0].trim().split(" ").map(Number);
console.log(solution(arr));
