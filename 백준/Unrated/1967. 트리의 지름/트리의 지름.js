const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, edge) {
  const ROOT = 1;

  let max = 0;
  const tree = init(n, edge);

  const dfs = (node, length) => {
    const children = tree[node].map(([child, weight]) => dfs(child, weight));

    children.sort((a, b) => b - a);

    switch (children.length) {
      case 0:
        return length;
      case 1:
        return length + children[0];
      default:
        max = Math.max(max, children[0] + children[1]);
        return length + children[0];
    }
  };

  max = Math.max(dfs(ROOT, 0), max);
  return max;
}

function init(n, edge) {
  const tree = Array.from(Array(n + 1), () => []);
  edge.forEach((row) => {
    const [parent, child, weight] = row.trim().split(" ").map(Number);
    tree[parent].push([child, weight]);
  });

  return tree;
}

const n = Number(input.shift().trim());
console.log(solution(n, input));
