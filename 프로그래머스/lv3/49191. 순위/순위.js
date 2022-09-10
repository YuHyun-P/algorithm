function solution(n, results) {
  const graph = Array.from(Array(n + 1), () => ({
    win: new Set(),
    lose: new Set(),
  }));

  results.forEach(([a, b]) => {
    graph[a].win.add(b);
    graph[b].lose.add(a);
  });

  graph.forEach((aEdges, a) => {
    if (aEdges.win.size === 0) return;

    const queue = [...aEdges.win];
    const visited = Array(n + 1).fill(false);

    while (queue.length > 0) {
      const b = queue.shift();
      visited[b] = true;

      if (!graph[b].lose.has(a)) {
        graph[b].lose.add(a);
      }

      if (!aEdges.win.has(b)) {
        aEdges.win.add(b);
      }

      [...graph[b].win].forEach((bb) => {
        if (visited[bb]) return;

        queue.push(bb);
        visited[bb] = true;
      });
    }
  });

  return graph.filter((edges) => edges.win.size + edges.lose.size === n - 1)
    .length;
}