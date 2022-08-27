/**
 * @param {number} n
 * @return {number[]}
 */
var grayCode = function(n) {
  const toggle = Array.from({length: n}, (_, index) => Math.pow(2, index));
  const visited = Array.from({length: Math.pow(2, n)}).fill(false);
  const path = [];
  
  const dfs = (node) => {
    if (visited[node]) {
      return;
    }
    
    path.push(node);
    visited[node] = true;
    
    toggle.forEach((toggleNum) => dfs(node ^ toggleNum));
  };
  
  dfs(0, 0);
  
  
  return path;
};