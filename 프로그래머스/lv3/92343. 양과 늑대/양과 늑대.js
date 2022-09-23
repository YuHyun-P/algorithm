function solution(info, edges) {
  const isSheep = (node) => info[node] === 0;

  const visitedEdges = Array(edges.length).fill(false);
  const visitedNodes = new Set();
  visitedNodes.add(0);
  let maxSheep = 0;

  const dfs = (node = 0, sheep = 1, wolf = 0) => {
    maxSheep = Math.max(maxSheep, sheep);

    edges.forEach(([parent, child], index) => {
      if (!visitedNodes.has(parent) || visitedEdges[index]) return;

      visitedEdges[index] = true;
      visitedNodes.add(child);

      if (isSheep(child)) dfs(child, sheep + 1, wolf);
      else if (sheep > wolf + 1) dfs(child, sheep, wolf + 1);

      visitedEdges[index] = false;
      visitedNodes.delete(child);
    });
  };

  dfs();

  return maxSheep;
}