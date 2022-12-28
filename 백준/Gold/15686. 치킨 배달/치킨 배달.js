const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, village) {
  const chicken = [];
  const house = [];

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      switch (village[row][col]) {
        case 1:
          house.push([row, col]);
          break;
        case 2:
          chicken.push([row, col]);
          break;
      }
    }
  }

  const visited = Array(chicken.length).fill(false);
  let minDistance = Infinity;

  const getTotalDistance = (chicken) => {
    let totalDistance = 0;

    house.forEach(([houseRow, houseCol]) => {
      let distance = Infinity;

      chicken.forEach(([chickenRow, chickenCol]) => {
        distance = Math.min(
          distance,
          Math.abs(houseRow - chickenRow) + Math.abs(houseCol - chickenCol)
        );
      });

      totalDistance += distance;
    });

    return totalDistance;
  };
  const backtracking = (selected, count) => {
    if (count === M) {
      const totalDistance = getTotalDistance(
        chicken.filter((_, index) => visited[index])
      );
      minDistance = Math.min(minDistance, totalDistance);
      return;
    }

    for (let next = selected + 1; next < visited.length; next++) {
      if (visited[next]) {
        continue;
      }

      visited[next] = true;
      backtracking(next, count + 1);
      visited[next] = false;
    }
  };

  backtracking(-1, 0);
  return minDistance;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const village = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, village));
