const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const totalTestCase = Number(input.shift().trim());
const questions = input.map((line) => line.trim().split(" ").map(Number));

const lcm = (a, b) => {
  const gcd = (a, b) => {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  };

  const gcdNM = gcd(a, b);
  return gcdNM * (a / gcdNM) * (b / gcdNM);
};

const getYear = ([M, N, x, y]) => {
  const maxYear = lcm(M, N);
  let year = -1;
  for (let curYear = x; curYear <= maxYear; curYear += M) {
    if ((curYear % N || N) === y) {
      year = curYear;
      break;
    }
  }
  return year;
};

console.log(questions.map(getYear).join("\n"));
