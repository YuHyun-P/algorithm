let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, _] = input[0].trim().split(" ").map(Number);

const graph = Array.from(Array(N + 1), () => []);
for (let line = 1; line < input.length; line++) {
  const [u, v] = input[line].trim().split(" ").map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

let count = 0;
const visited = Array(N + 1).fill(false);
const queue = [];

for (let start = 1; start < N + 1; start++) {
  if (visited[start]) continue;

  queue.push(start);
  visited[start] = true;

  while (queue.length > 0) {
    const cur = queue.shift();

    graph[cur].forEach((next) => {
      if (visited[next]) return;

      visited[next] = true;
      queue.push(next);
    });
  }

  count++;
}

console.log(count);
