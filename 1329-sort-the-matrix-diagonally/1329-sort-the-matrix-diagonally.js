/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var diagonalSort = function(mat) {
  const [m, n] = [mat.length, mat[0].length];
  const diagonalPaths = {};
  const afterMat = Array.from({length: m}, () => Array.from({length: n}).fill(0));
  
  mat.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
    const key = colIndex - rowIndex;
    const num = mat[rowIndex][colIndex];
    if (diagonalPaths[key]) {
      diagonalPaths[key].push(num);
    } else {
      diagonalPaths[key] = [num];
    }
  }));
  
  Object.keys(diagonalPaths).forEach((key) => diagonalPaths[key].sort((a, b) => b - a));
  
  afterMat.forEach((row, rowIndex) => row.forEach((col, colIndex) => {
    const key = colIndex - rowIndex;
    const num = diagonalPaths[key].pop();
    afterMat[rowIndex][colIndex] = num;
  }));
  return afterMat;
};