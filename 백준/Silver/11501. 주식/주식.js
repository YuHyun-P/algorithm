const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, query) {
  const answer = [];
  const calcMaxProfit = (N, price) => {
    let buy = 0;
    let sell = 0;
    let stock = 0;

    const maxPrice = [...price];
    for (let i = N - 1 - 1; 0 <= i; i--) {
      if (maxPrice[i] < maxPrice[i + 1]) {
        maxPrice[i] = maxPrice[i + 1];
      }
    }

    for (let i = 0; i < N; i++) {
      if (price[i] < maxPrice[i]) {
        buy += price[i];
        stock += 1;
      }

      if (stock && price[i] === maxPrice[i]) {
        sell += price[i] * stock;
        stock = 0;
      }
    }

    return sell - buy;
  };

  for (let t = 0; t < T; t++) {
    answer.push(
      calcMaxProfit(
        Number(query[t * 2].trim()),
        query[t * 2 + 1].trim().split(" ").map(Number)
      )
    );
  }

  return answer.join("\n");
}

const T = Number(input.shift().trim());
console.log(solution(T, input));
