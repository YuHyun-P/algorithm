const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, rank, m, pair) {
  const indegree = Array(n + 1).fill(0);
  const graph = Array.from(Array(n + 1), () => Array(n + 1).fill(0));

  indegree[0] = Infinity;

  for (const [cur, team] of rank.entries()) {
    indegree[team] = cur;
    for (let lower = cur + 1; lower < rank.length; lower++) {
      graph[team][rank[lower]] = 1;
    }
  }
  for (let [u, v] of pair) {
    if (graph[u][v] === 1) [u, v] = [v, u];

    graph[u][v] = 1;
    graph[v][u] = 0;
    indegree[u] -= 1;
    indegree[v] += 1;
  }

  const topologySort = () => {
    let head = 0;
    const queue = [];

    indegree.forEach((value, team) => {
      if (value !== 0) return;
      queue.push(team);
    });

    while (queue.length - head) {
      if (queue.length - head > 1) break;

      const cur = queue[head++];

      for (const [next, edge] of graph[cur].entries()) {
        if (edge === 0) continue;

        indegree[next] -= 1;
        if (indegree[next] === 0) queue.push(next);
      }
    }

    return queue;
  };

  const curRank = topologySort();
  return curRank.length === n
    ? curRank.map((team) => team).join(" ")
    : "IMPOSSIBLE";
}

let cursor = 0;
const T = Number(input[cursor++]);
const answer = Array(T).fill(null);
for (let t = 0; t < answer.length; t++) {
  const n = Number(input[cursor++]);
  const rank = input[cursor++].split(" ").map(Number);
  const m = Number(input[cursor++]);
  const pair = input
    .slice(cursor, cursor + m)
    .map((row) => row.split(" ").map(Number));
  cursor += m;
  answer[t] = solution(n, rank, m, pair);
}

console.log(answer.join("\n"));
