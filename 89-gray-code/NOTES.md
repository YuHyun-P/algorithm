# 재귀 순서
**_코드_**
```js
var grayCode = function(n) {
  const toggle = Array.from({length: n}, (_, index) => Math.pow(2, index));
  const visited = Array.from({length: Math.pow(2, n)}).fill(false);
  const path = [];
  
  const dfs = (node, level) => {
    console.log("node:", node.toString(2).padStart(2, "0"), " level:", level);
    if (visited[node]) {
      return;
    }
    path.push(node);
    visited[node] = true;
    toggle.forEach((toggleNum) => dfs(node ^ toggleNum, level + 1));
  };
  
  dfs(0, 0);
  return path;
};
```
**_콘솔_**
```bash
node: 00  level: 0
node: 01  level: 1
node: 00  level: 2
node: 11  level: 2
node: 10  level: 3
node: 11  level: 4
node: 00  level: 4
node: 01  level: 3
node: 10  level: 1
```

![grayCode](https://user-images.githubusercontent.com/96400112/187033604-9c4acd74-1c17-4710-b861-56d1b0a64eea.jpeg)

## `visited`를 통해 가지치기!
