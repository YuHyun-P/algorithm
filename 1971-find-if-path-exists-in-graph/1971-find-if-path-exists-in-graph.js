/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function(n, edges, source, destination) {
  const graph = Array.from({length: n}, () => []);
  edges.forEach(([u, v]) => {
    graph[v].push(u);
    graph[u].push(v);
  });
  
  const visited = Array.from({length: n}).fill(false);
  const queue = [source];
  let found = false;
  
  while (queue.length !== 0) {
    const node = queue.shift();
    
    if (visited[node]) continue;
    
    if (node === destination) {
      found = true;
      break;
    }
    
    visited[node] = true;
    queue.push(...graph[node]);
  }
  
  return found;
};