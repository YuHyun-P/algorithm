const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function canDivide(V, graph) {
  const set = Array(V + 1).fill(0);

  const bfs = (start) => {
    let head = 0;
    const queue = [start];
    set[start] = 1;

    while (queue.length - head) {
      const cur = queue[head++];

      for (const next of graph[cur]) {
        if (next === cur || set[next] === -set[cur]) continue;
        if (set[next] === set[cur]) {
          return false;
        }

        set[next] = -set[cur];
        queue.push(next);
      }
    }

    return true;
  };

  for (let i = 1; i < V + 1; i++) {
    if (set[i] !== 0) continue;
    const subResult = bfs(i);
    if (!subResult) return false;
  }

  return true;
}

let cursor = 0;
const T = Number(input[cursor++]);
for (let tc = 0; tc < T; tc++) {
  let [V, E] = input[cursor++].split(" ").map(Number);
  const graph = Array.from(Array(V + 1), () => []);

  while (E) {
    const [u, v] = input[cursor++].split(" ").map(Number);

    graph[u].push(v);
    graph[v].push(u);
    E -= 1;
  }

  console.log(canDivide(V, graph) ? "YES" : "NO");
}
