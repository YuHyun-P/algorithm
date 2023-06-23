const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, buckets, movements) {
  const MAX_S = 50;
  const WATER_FOR_CLOUD = 2;
  const DIRECTION = [
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];
  const DIAGONAL = DIRECTION.filter(([dr, dc]) => dr && dc);

  let clouds = [
    [N - 2, 0],
    [N - 2, 1],
    [N - 1, 0],
    [N - 1, 1],
  ];

  const outOfBound = (r, c) => r < 0 || c < 0 || N <= r || N <= c;
  const move = (d, s, clouds) => {
    const [dr, dc] = DIRECTION[d];
    const moved = [];
    clouds.forEach(([r, c]) => {
      const nr = (r + dr * s + Math.ceil(MAX_S / N) * N) % N;
      const nc = (c + dc * s + Math.ceil(MAX_S / N) * N) % N;
      moved.push([nr, nc]);
    });
    return moved;
  };
  const rain = (clouds) => {
    clouds.forEach(([r, c]) => (buckets[r][c] += 1));
  };
  const copy = (clouds) => {
    clouds.forEach(([r, c]) => {
      const adjacent = DIAGONAL.filter(([dr, dc]) => {
        const [nr, nc] = [r + dr, c + dc];
        return !outOfBound(nr, nc) && buckets[nr][nc] > 0;
      }).length;
      buckets[r][c] += adjacent;
    });
  };
  const createClouds = (clouds) => {
    const toString = ([r, c]) => [r, c].join(" ");

    const prevClouds = new Set(clouds.map(toString));
    const newClouds = [];

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (buckets[r][c] < WATER_FOR_CLOUD) continue;
        if (prevClouds.has(toString([r, c]))) continue;

        buckets[r][c] -= WATER_FOR_CLOUD;
        newClouds.push([r, c]);
      }
    }
    return newClouds;
  };
  const sum = () => {
    return buckets.reduce(
      (acc, row) => acc + row.reduce((acc, water) => acc + water, 0),
      0
    );
  };

  movements.forEach(([d, s]) => {
    d -= 1;

    clouds = move(d, s, clouds);
    rain(clouds);
    copy(clouds);
    clouds = createClouds(clouds);
  });

  return sum();
}

const [N, M] = input.shift().split(" ").map(Number);
const buckets = input.splice(0, N).map((row) => row.split(" ").map(Number));
const movements = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, M, buckets, movements));
