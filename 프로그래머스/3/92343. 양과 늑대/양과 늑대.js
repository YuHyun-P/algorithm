function solution(info, edges) {
  const ROOT = 0;
  const SHEEP = 0;

  let maxSheep = 0;
  const tree = (() => {
    const tree = Array.from(Array(edges.length + 1), () => []);
    edges.forEach(([parent, child]) => tree[parent].push(child));
    return tree;
  })();
  const visited = Array(2 ** info.length).fill(false);

  const isSheep = (node) => info[node] === SHEEP;

  const dfs = (root, reachableList, sheep, wolf, history) => {
    const nextHistory = history | (1 << root);
    visited[nextHistory] = true;

    const nextSheep = sheep + (isSheep(root) ? 1 : 0);
    const nextWolf = wolf + (isSheep(root) ? 0 : 1);

    if (nextSheep <= nextWolf) {
      return;
    }

    maxSheep = Math.max(maxSheep, nextSheep);

    const children = tree[root];
    children.forEach((child) => {
      reachableList[child] = true;
    });

    reachableList.forEach((reachable, index) => {
      if (!reachable) {
        return;
      }

      if (nextHistory & (1 << index)) {
        return;
      }

      reachableList[index] = false;
      dfs(index, reachableList, nextSheep, nextWolf, nextHistory);
      reachableList[index] = true;
    });

    children.forEach((child) => {
      reachableList[child] = false;
    });
  };

  dfs(ROOT, Array(info.length).fill(false), 0, 0, 0);

  return maxSheep;
}