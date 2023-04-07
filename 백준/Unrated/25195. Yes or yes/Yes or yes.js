const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, edge, fan, S) {
  const START = 1;
  const [INIT, NO, YES] = [-1, 0, 1];

  const state = Array(N + 1).fill(INIT);
  const graph = Array.from(Array(N + 1), () => []);

  edge.forEach((row) => {
    const [u, v] = row.split(" ").map(Number);
    graph[u].push(v);
  });
  fan.forEach((v) => (state[v] = YES));

  const dfs = (cur, state) => {
    if (state[cur] !== INIT) return state[cur];
    if (graph[cur].length === 0) {
      state[cur] = NO;
      return state[cur];
    }

    state[cur] = YES;
    for (const next of graph[cur]) {
      if (dfs(next, state) === NO) {
        state[cur] = NO;
        break;
      }
    }

    return state[cur];
  };

  return dfs(START, state) === YES ? "Yes" : "yes";
}

const [N, M] = input.shift().split(" ").map(Number);
const fan = input.pop().split(" ").map(Number);
const S = Number(input.pop());
console.log(solution(N, M, input, fan, S));
