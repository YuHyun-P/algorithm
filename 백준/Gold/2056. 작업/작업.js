const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, job) {
  const { indegree, process, graph } = init(N, job);
  const complete = Array(N + 1).fill(0);
  complete[0] = -1;

  const topologicalSort = () => {
    let head = 0;
    const queue = [];

    for (let i = 1; i < N + 1; i++) {
      if (indegree[i] !== 0) continue;

      queue.push(i);
      complete[i] = process[i];
    }

    while (queue.length - head) {
      const cur = queue[head++];

      for (const next of graph[cur]) {
        indegree[next] -= 1;
        complete[next] = Math.max(
          complete[cur] + process[next],
          complete[next]
        );

        if (indegree[next] !== 0) continue;
        queue.push(next);
      }
    }
  };

  topologicalSort();
  return Math.max(...complete);
}

function init(N, input) {
  const indegree = [Infinity];
  const process = [Infinity];
  const graph = Array.from(Array(N + 1), () => []);

  input.forEach((row, index) => {
    const [curProcess, curIndegree, ...vertex] = row.split(" ").map(Number);
    indegree.push(curIndegree);
    process.push(curProcess);
    vertex.forEach((v) => graph[v].push(index + 1));
  });

  return { indegree, process, graph };
}

const N = Number(input.shift());
console.log(solution(N, input));
