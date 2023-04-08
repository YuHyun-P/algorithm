const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(R, C, board, N, columns) {
  const [EMPTY, WALL, STONE] = [".", "X", "O"];

  const path = Array.from(Array(C), () => []);
  const outOfBound = (r, c) => r < 0 || c < 0 || R <= r || C <= c;
  const isEmpty = (r, c) => !outOfBound(r, c) && board[r][c] === EMPTY;
  const drop = (r, c, path) => {
    let fixed = false;
    while (!fixed) {
      path.push([r, c]);
      if (outOfBound(r + 1, c)) {
        fixed = true;
        break;
      }

      switch (board[r + 1][c]) {
        case EMPTY:
          r += 1;
          break;
        case STONE:
          if (isEmpty(r, c - 1) && isEmpty(r + 1, c - 1)) {
            r += 1;
            c -= 1;
          } else if (isEmpty(r, c + 1) && isEmpty(r + 1, c + 1)) {
            r += 1;
            c += 1;
          } else {
            fixed = true;
          }
          break;
        case WALL:
          fixed = true;
          break;
      }
    }

    return path.pop();
  };

  columns.forEach((char) => {
    const col = Number(char) - 1;
    const curPath = path[col];
    while (curPath.length && !isEmpty(...curPath.at(-1))) curPath.pop();

    const [r, c] = curPath.pop() ?? [0, col];
    const [droppedR, droppedC] = drop(r, c, curPath);
    board[droppedR][droppedC] = STONE;
  });

  for (let r = 0; r < R; r++) {
    console.log(board[r].join(""));
  }
}

const [R, C] = input.shift().split(" ").map(Number);
const board = input.splice(0, R).map((row) => row.trim().split(""));
const N = Number(input.shift());
solution(R, C, board, N, input);
