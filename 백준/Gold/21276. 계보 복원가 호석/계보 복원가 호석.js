const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, name, edge) {
  const [indegree, graph] = init(name, edge);
  const root = [];
  const children = new Map(name.map((name) => [name, []]));
  const stack = [];

  for (const [cur, count] of indegree.entries()) {
    if (count === 0) {
      root.push(cur);
      stack.push(cur);
    }
  }

  while (stack.length) {
    const cur = stack.pop();

    for (const next of graph.get(cur)) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) {
        children.get(cur).push(next);
        stack.push(next);
      }
    }
  }

  return formatAnswer(root, children);
}

function init(nameList, edge) {
  const indegree = new Map(nameList.map((name) => [name, 0]));
  const graph = new Map(nameList.map((name) => [name, []]));
  edge.forEach((row) => {
    const [nameA, nameB] = row.trim().split(" ");
    graph.get(nameB).push(nameA);
    indegree.set(nameA, indegree.get(nameA) + 1);
  });
  return [indegree, graph];
}

function formatAnswer(root, children) {
  const alphabetical = (nameA, nameB) => (nameA < nameB ? -1 : 1);
  const answer = [root.length, root.sort(alphabetical).join(" ")];
  const sorted = [...children.keys()].sort(alphabetical);

  for (const cur of sorted) {
    const curChildren = children.get(cur);
    answer.push(
      [cur, curChildren.length, curChildren.sort(alphabetical).join(" ")].join(
        " "
      )
    );
  }
  return answer.join("\n");
}

const N = Number(input.shift().trim());
const name = input.shift().trim().split(" ");
const M = Number(input.shift().trim());

console.log(solution(N, name, input));
