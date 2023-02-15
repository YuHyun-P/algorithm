const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, T, plates, query) {
  const NULL = 0;

  const di = [0, 1];
  const dj = [1, 0];

  let total = 0;
  const heads = Array(N).fill(0);

  const debug = () => {
    console.log(heads);
    console.log(
      heads
        .map((head, i) =>
          plates[i].slice(head).concat(plates[i].slice(0, head))
        )
        .map((row) => row.map((num) => String(num).padStart(3, " ")).join(" "))
        .join("\n"),
      "\n"
    );
  };

  const convertIndices = (i, j) => [i, (heads[i] + j + M) % M];
  const outOfBound = (i, j) => i < 0 || j < 0 || N <= i || M <= j;
  const rotate = (plateIndex, dir, offset) => {
    const offsetWithSign = dir === 0 ? -offset : offset;
    heads[plateIndex] = (heads[plateIndex] + offsetWithSign + M) % M;
  };
  const rotateAll = (x, d, k) => {
    const paddedX = x - 1;
    for (let i = paddedX; i < N; i += x) {
      rotate(i, d, k);
    }
  };
  const update = () => {
    const removed = [];
    let total = 0;
    let count = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const [curI, curJ] = convertIndices(i, j);

        let curRemoved = false;
        const cur = plates[curI][curJ];
        if (cur === NULL) continue;

        total += cur;
        count += 1;

        for (let dir = 0; dir < di.length; dir++) {
          const [nextI, nextJ] = convertIndices(i + di[dir], j + dj[dir]);
          if (outOfBound(nextI, nextJ)) continue;
          if (cur !== plates[nextI][nextJ]) continue;

          removed.push([nextI, nextJ]);
          curRemoved = true;
        }

        if (curRemoved) {
          removed.push([curI, curJ]);
        }
      }
    }

    if (removed.length > 0) {
      while (removed.length > 0) {
        const [i, j] = removed.pop();
        plates[i][j] = NULL;
      }
      return;
    }

    const avg = total / count;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (plates[i][j] === NULL) continue;
        if (plates[i][j] > avg) plates[i][j] -= 1;
        else if (plates[i][j] < avg) plates[i][j] += 1;
      }
    }
  };

  query.forEach(([x, d, k]) => {
    rotateAll(x, d, k);
    update();
  });

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      total += plates[i][j];
    }
  }

  return total;
}

const [N, M, T] = input.shift().split(" ").map(Number);
const plates = input.splice(0, N).map((row) => row.split(" ").map(Number));
const query = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, T, plates, query));
