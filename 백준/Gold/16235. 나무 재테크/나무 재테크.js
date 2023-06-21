const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, K, A, trees) {
  const INIT_NUTRIENT = 5;
  const MAX_K = 1000;
  const MAX_INIT_TREE_AGE = 10;
  const MAX_TREE_AGE = MAX_K + MAX_INIT_TREE_AGE;
  const BREED_AGE = 5;

  let nTree = trees.length;
  const adjacent = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];
  const nutrients = Array.from(Array(N), () => Array(N).fill(INIT_NUTRIENT));
  const treeCounts = Array.from(Array(N), () =>
    Array.from(Array(N), () => Array(MAX_TREE_AGE + 1).fill(0))
  );

  trees.forEach(([r, c, age]) => {
    treeCounts[r - 1][c - 1][age] += 1;
  });

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const year = () => {
    let dTree = 0;

    treeCounts.forEach((row, r) => {
      row.forEach((treeCount, c) => {
        let dNutrient = 0;
        const nourished = Array(MAX_TREE_AGE + 1).fill(0);

        treeCount.forEach((count, age) => {
          if (age === 0 || count === 0) {
            return;
          }

          const nNourished = Math.min(count, Math.floor(nutrients[r][c] / age));
          const nDead = count - nNourished;

          if (0 < nNourished) {
            nutrients[r][c] -= nNourished * age;
            nourished[age + 1] += nNourished;
          }

          if (0 < nDead) {
            dNutrient += nDead * Math.floor(age / 2);
            dTree -= nDead;
          }
        });

        treeCounts[r][c] = nourished;
        nutrients[r][c] += dNutrient;
      });
    });

    treeCounts.forEach((row, r) => {
      row.forEach((treeCount, c) => {
        for (let age = BREED_AGE; age < treeCount.length; age += BREED_AGE) {
          adjacent.forEach(([dr, dc]) => {
            if (treeCount[age] === 0) {
              return;
            }

            const nr = r + dr;
            const nc = c + dc;
            if (outOfBound(nr, nc)) {
              return;
            }

            treeCounts[nr][nc][1] += treeCount[age];
            dTree += treeCount[age];
          });
        }

        nutrients[r][c] += A[r][c];
      });
    });

    return dTree;
  };

  while (K) {
    nTree += year();
    K--;
  }

  return nTree;
}

const [N, M, K] = input.shift().split(" ").map(Number);
const A = input.splice(0, N).map((row) => row.split(" ").map(Number));
const trees = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, K, A, trees));
