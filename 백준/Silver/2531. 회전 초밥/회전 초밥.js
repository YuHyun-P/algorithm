const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, d, k, c, sushi) {
  const eaten = Array(d + 1).fill(0);
  let cnt = 0;
  let end = 0;
  let max = 0;

  const getSushi = (index) => sushi[(index + N) % N];

  for (let start = 0; start < N; start++) {
    while (end - start < k) {
      if (eaten[getSushi(end)] === 0) cnt += 1;
      eaten[getSushi(end)] += 1;
      end += 1;
    }

    max = Math.max(max, cnt + (eaten[c] === 0 ? 1 : 0));
    eaten[getSushi(start)] -= 1;
    if (eaten[getSushi(start)] === 0) cnt -= 1;
  }

  return max;
}

const [N, d, k, c] = input.shift().trim().split(" ").map(Number);
const sushi = input.map((row) => Number(row.trim()));
console.log(solution(N, d, k, c, sushi));
