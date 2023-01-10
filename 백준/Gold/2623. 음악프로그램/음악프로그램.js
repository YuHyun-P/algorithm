const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, subPath) {
  const [graph, indegree] = init(N, subPath);
  const order = [];
  const stack = [];
  for (let cur = 1; cur < indegree.length; cur++) {
    indegree[cur] === 0 && stack.push(cur);
  }

  while (stack.length) {
    const cur = stack.pop();
    order.push(cur);

    for (const next of graph[cur]) {
      indegree[next] -= 1;
      indegree[next] === 0 && stack.push(next);
    }
  }

  return indegree.every((count) => count === 0) ? order.join("\n") : "0";
}

function init(N, subPath) {
  const graph = Array.from(Array(N + 1), () => []);
  const indegree = Array(N + 1).fill(0);

  subPath.forEach((row) => {
    const list = row.trim().split(" ").map(Number);
    for (let index = 1; index < list.length - 1; index++) {
      const prev = list[index];
      const next = list[index + 1];

      indegree[next] += 1;
      graph[prev].push(next);
    }
  });

  return [graph, indegree];
}

const [N, M] = input.shift().trim().split(" ").map(Number);
console.log(solution(N, M, input));
