const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, graph) {
  if (M === 0) return 0;

  const visited = Array(N + 1).fill(false);
  const getMin = (cur, curW) => {
    let children = 0;
    for (const [child, w] of graph[cur]) {
      if (visited[child]) continue;
      visited[child] = true;
      children += getMin(child, w);
    }

    if (children === 0 || curW < children) return curW;
    return children;
  };

  visited[1] = true;
  return getMin(1, Infinity);
}

let cursor = 0;
const T = Number(input[cursor++].trim());
const answer = Array(T).fill(0);
for (let tc = 0; tc < T; tc++) {
  const [N, M] = input[cursor++].split(" ").map(Number);
  let iter = M;
  const graph = Array.from(Array(N + 1), () => []);
  while (iter) {
    const [u, v, w] = input[cursor++].split(" ").map(Number);
    graph[u].push([v, w]);
    graph[v].push([u, w]);
    iter -= 1;
  }
  answer[tc] = solution(N, M, graph);
}
console.log(answer.join("\n"));
