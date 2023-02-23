const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(board) {
  const SIZE = 5;
  const LIMIT = 7;
  const AT_LEAST = 4;

  let count = 0;
  const dr = [0, 1, 0, -1];
  const dc = [1, 0, -1, 0];

  const convertPosition = (index) => [Math.floor(index / SIZE), index % SIZE];
  const outOfBound = (row, col) =>
    row < 0 || col < 0 || SIZE <= row || SIZE <= col;
  const isSatisfied = (path) => {
    let dasom = 0;

    let head = 0;
    const queue = [];
    const isMember = Array.from(Array(SIZE), () => Array(SIZE).fill(false));

    path.forEach((index) => {
      const [row, col] = convertPosition(index);
      isMember[row][col] = true;
      if (board[row][col] === "S") {
        dasom += 1;
      }
    });

    if (dasom < AT_LEAST) return false;

    const [startRow, startCol] = convertPosition(path[0]);
    queue.push([startRow, startCol]);
    isMember[startRow][startCol] = false;

    while (queue.length - head) {
      const [row, col] = queue[head++];

      for (let dir = 0; dir < dr.length; dir++) {
        const nextRow = row + dr[dir];
        const nextCol = col + dc[dir];

        if (outOfBound(nextRow, nextCol)) continue;
        if (!isMember[nextRow][nextCol]) continue;

        isMember[nextRow][nextCol] = false;
        queue.push([nextRow, nextCol]);
      }
    }

    return queue.length === path.length;
  };
  const dfs = (cur, path) => {
    if (path.length === LIMIT) {
      if (isSatisfied(path)) {
        count += 1;
      }
      return;
    }

    for (let next = cur + 1; next < SIZE * SIZE; next++) {
      path.push(next);
      dfs(next, path);
      path.pop();
    }
  };

  dfs(-1, []);
  return count;
}

const board = input.map((row) => row.trim().split(""));
console.log(solution(board));
