const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, K, board, word) {
  const dr = [0, 1, 0, -1, 1, 1, -1, -1];
  const dc = [1, 0, -1, 0, 1, -1, -1, 1];
  const length = new Set();
  const like = new Map();
  let maxLength = 0;

  for (const w of word) {
    length.add(w.trim().length);
    like.set(w.trim(), new Set());
    maxLength = Math.max(maxLength, w.trim().length);
  }

  const dfs = (str, path) => {
    if (str.length > maxLength) {
      return;
    }

    if (length.has(str.length) && like.has(str)) {
      like.get(str).add(path.join(" "));
    }

    for (let move = 0; move < dr.length; move++) {
      const nextRow = (path.at(-1)[0] + dr[move] + N) % N;
      const nextCol = (path.at(-1)[1] + dc[move] + M) % M;

      path.push([nextRow, nextCol]);
      dfs(str + board[nextRow][nextCol], path);
      path.pop();
    }
  };

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < M; c++) {
      dfs(board[r][c], [[r, c]]);
    }
  }

  return word.map((w) => like.get(w.trim()).size).join("\n");
}

const [N, M, K] = input.shift().trim().split(" ").map(Number);
const board = input.splice(0, N);
console.log(solution(N, M, K, board, input));
