const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, building) {
  const X = 0;

  const targetQuadrant = [1, 4];
  const maxProfit = [0, 0];

  const calcQuadrant = (baseX, baseY, x, y) => {
    if (x > baseX) {
      if (y > baseY) return 1;
      return 4;
    }
    if (y > baseY) return 2;
    return 3;
  };
  const dfs = (quadrant) => {
    const maxProfit = Array(N).fill(0);

    const dfs = (index, profit) => {
      if (maxProfit[index] >= profit) {
        return profit;
      }

      const [curX, curY] = building[index];
      maxProfit[index] = profit;

      let max = profit;
      for (let next = index + 1; next < N; next++) {
        const [nextX, nextY, nextProfit] = building[next];
        const nextQuadrant = calcQuadrant(curX, curY, nextX, nextY);
        if (quadrant !== nextQuadrant) continue;

        max = Math.max(dfs(next, profit + nextProfit), max);
      }

      return max;
    };

    return dfs;
  };

  building.sort((a, b) => a[X] - b[X]);

  for (let i = 0; i < targetQuadrant.length; i++) {
    const curDfs = dfs(targetQuadrant[i]);

    for (let start = 0; start < N; start++) {
      const [_, __, profit] = building[start];
      const curProfit = curDfs(start, profit);

      maxProfit[i] = Math.max(curProfit, maxProfit[i]);
    }
  }

  return Math.max(...maxProfit);
}

const N = Number(input.shift());
const building = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, building));
