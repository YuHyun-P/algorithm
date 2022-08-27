/**
 * @param {number[][]} edges
 * @return {number}
 */
var findCenter = function(edges) {
  const edgeCount = Array.from({length: edges.length + 2}).fill(0);
  edges.forEach(([u, v]) => {
    edgeCount[u] += 1;
    edgeCount[v] += 1;
  });
  
  return edgeCount.indexOf(edges.length);
};