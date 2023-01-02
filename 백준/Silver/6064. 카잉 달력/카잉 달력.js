const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(testCase) {
  const getGCD = (M, N) => {
    if (N === 0) {
      return M;
    }
    return getGCD(N, M % N);
  };
  const getLCM = (M, N) => {
    const gcd = getGCD(M, N);
    return gcd * (M / gcd) * (N / gcd);
  };

  const getYear = ([M, N, x, y]) => {
    if (y === N) {
      y = 0;
    }

    const max = getLCM(M, N);
    for (let composite = 0; composite * M + x <= max; composite++) {
      const cur = composite * M + x;

      if (cur % N === y) {
        return cur;
      }
    }
    return -1;
  };
  return testCase.map(getYear);
}

const T = Number(input.shift().trim());
const testCase = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(testCase).join("\n"));
