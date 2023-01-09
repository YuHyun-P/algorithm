const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, edge) {
  const parent = Array(N + 1).fill(0);
  const tree = Array.from(Array(N + 1), () => []);
  edge.forEach(([v, u]) => {
    tree[v].push(u);
    tree[u].push(v);
  });

  const bfs = () => {
    let head = 0;
    const queue = [1];

    while (queue.length - head) {
      const cur = queue[head++];

      for (const next of tree[cur]) {
        if (parent[cur] === next) {
          continue;
        }

        parent[next] = cur;
        queue.push(next);
      }
    }
  };
  bfs();
  return parent.slice(2);
}

const N = Number(input.shift().trim());
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, edge).join("\n"));
