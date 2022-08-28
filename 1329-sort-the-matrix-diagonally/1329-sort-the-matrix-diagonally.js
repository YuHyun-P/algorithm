/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var diagonalSort = function(mat) {
  const [m, n] = [mat.length, mat[0].length];
  const diagonalNum = m + n - 1;
  const diagonalPaths = [];
  const afterMat = Array.from({length: m}, () => Array.from({length: n}).fill(0));
  
  const getDiagonalPath = (start) => {
    let [curRow, curCol] = start;
    const diagonalPath = [];
    
    while (curRow < m && curCol < n) {
      diagonalPath.push([curRow++, curCol++]);
    }
    return diagonalPath;
  }
  
  Array.from({length: m}).forEach((_, index) => {
    const start = [m - index - 1, 0];
    diagonalPaths.push(getDiagonalPath(start));
  })
  Array.from({length: n - 1}).forEach((_, index) => {
    const start = [0, index + 1];
    diagonalPaths.push(getDiagonalPath(start));
  })
  
  diagonalPaths.forEach((path) => {
    const beforeDiagonal = path.map(([i, j]) => mat[i][j]);
    const afterDiagonal = beforeDiagonal.sort((a, b) => a - b);
    
    path.forEach(([i, j], index) => afterMat[i][j] = afterDiagonal[index]);
  })
  
  return afterMat;
};