const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, line) {
  const [INIT, WHITE, BLACK] = [-1, 0, 1];
  const color = Array(n + 1).fill(INIT);
  const graph = Array.from(Array(n + 1), () => []);

  line.forEach(([c1, c2]) => {
    graph[c1].push(c2);
    graph[c2].push(c1);
  });

  const bfs = (start, color) => {
    let head = 0;
    const queue = [start];
    color[start] = WHITE;

    while (queue.length - head) {
      const cur = queue[head++];
      const curColor = color[cur];
      const nextColor = (color[cur] + 1) % 2;

      for (const next of graph[cur]) {
        if (color[next] === nextColor) continue;
        if (color[next] === curColor) return false;
        color[next] = nextColor;
        queue.push(next);
      }
    }
    return true;
  };

  for (let start = 1; start < n + 1; start++) {
    if (color[start] !== INIT) continue;
    if (!bfs(start, color)) return "impossible";
  }
  return "possible";
}

let cursor = 0;
const T = Number(input[cursor++]);
const answer = Array(T).fill(null);
for (let t = 0; t < T; t++) {
  let [n, m] = input[cursor++].split(" ").map(Number);
  const line = [];
  while (m) {
    line.push(input[cursor++].split(" ").map(Number));
    m -= 1;
  }
  answer[t] = solution(n, line);
}
console.log(answer.join("\n"));
