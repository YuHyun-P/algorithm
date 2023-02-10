const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, A) {
  let head = 0;
  let step = 0;
  const isRobot = Array(2 * N).fill(false);

  const calcIndex = (i) => (i + 2 * N) % (2 * N);

  while (A.filter((num) => num === 0).length < K) {
    head = calcIndex(head - 1);
    step += 1;

    isRobot[calcIndex(head + N - 1)] = false;

    for (let offset = N - 2; 0 <= offset; offset--) {
      const cur = calcIndex(head + offset);
      const next = calcIndex(cur + 1);

      if (!isRobot[cur]) continue;
      if (isRobot[next]) continue;
      if (A[next] < 1) continue;

      isRobot[cur] = false;
      isRobot[next] = true;
      A[next] -= 1;
    }

    isRobot[calcIndex(head + N - 1)] = false;

    if (A[head] !== 0) {
      isRobot[head] = true;
      A[head] -= 1;
    }
  }

  return step;
}

const [N, K] = input[0].split(" ").map(Number);
const A = input[1].split(" ").map(Number);
console.log(solution(N, K, A));
