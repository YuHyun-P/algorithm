const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, query) {
  let answer = "";
  const calcMaxProfit = (N, price) => {
    let profit = 0;
    let maxPrice = price[N - 1];

    for (let i = N - 1 - 1; 0 <= i; i--) {
      if (price[i] > maxPrice) {
        maxPrice = price[i];
      }
      profit += maxPrice - price[i];
    }

    return profit;
  };

  for (let t = 0; t < T; t++) {
    answer += `${calcMaxProfit(
      Number(query[t * 2].trim()),
      query[t * 2 + 1].trim().split(" ").map(Number)
    )}\n`;
  }

  return answer.trim();
}

const T = Number(input.shift().trim());
console.log(solution(T, input));
