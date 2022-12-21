const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(" ").map(Number));

function solution(N, M, board) {
  const cctvPos = [];
  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      if (col === 0 || col === 6) {
        return;
      }
      cctvPos.push([rowIndex, colIndex]);
    })
  );

  const copy = (board) => {
    return board.map((row) => [...row]);
  };

  const checkRow = (direction, row, col, board) => {
    let curCol = col;
    while (0 <= curCol && curCol < M) {
      if (board[row][curCol] === 6) {
        break;
      }

      if (board[row][curCol] === 0) {
        board[row][curCol] = -1;
      }
      curCol += direction;
    }
  };

  const checkCol = (direction, row, col, board) => {
    let curRow = row;
    while (0 <= curRow && curRow < N) {
      if (board[curRow][col] === 6) {
        break;
      }

      if (board[curRow][col] === 0) {
        board[curRow][col] = -1;
      }
      curRow += direction;
    }
    return board;
  };

  const checkDirection = (direction, row, col, board) => {
    switch (direction) {
      case 0:
        checkRow(1, row, col, board);
        break;
      case 1:
        checkCol(1, row, col, board);
        break;
      case 2:
        checkRow(-1, row, col, board);
        break;
      case 3:
        checkCol(-1, row, col, board);
        break;
    }
  };

  const getChecked = (cctv, direction, row, col, board) => {
    // direction: Right, Down, Left, Up
    const checked = copy(board);
    switch (cctv) {
      case 1:
        checkDirection(direction, row, col, checked);
        return checked;
      case 2:
        checkDirection(direction, row, col, checked);
        checkDirection((direction + 2) % 4, row, col, checked);
        return checked;
      case 3:
        checkDirection(direction, row, col, checked);
        checkDirection((direction + 1) % 4, row, col, checked);
        return checked;
      case 4:
        checkDirection(direction, row, col, checked);
        checkDirection((direction + 1) % 4, row, col, checked);
        checkDirection((direction + 2) % 4, row, col, checked);
        return checked;
      case 5:
        checkDirection(direction, row, col, checked);
        checkDirection((direction + 1) % 4, row, col, checked);
        checkDirection((direction + 2) % 4, row, col, checked);
        checkDirection((direction + 3) % 4, row, col, checked);
        return checked;
      default:
        throw new Error(`Invalid direction ${direction}`);
    }
  };

  const directions = [
    [],
    [0, 1, 2, 3],
    [0, 1],
    [0, 1, 2, 3],
    [0, 1, 2, 3],
    [0],
  ];
  let minBlind = N * M - cctvPos.length;

  const dfs = (cctvPosIndex, board) => {
    if (cctvPosIndex === cctvPos.length) {
      minBlind = Math.min(
        minBlind,
        board.flat().filter((col) => col === 0).length
      );
      return;
    }

    const [row, col] = cctvPos[cctvPosIndex];
    const cctv = board[row][col];
    directions[cctv].forEach((direction) => {
      dfs(cctvPosIndex + 1, getChecked(cctv, direction, row, col, board));
    });
  };
  dfs(0, board);

  return minBlind;
}

console.log(solution(N, M, board));
