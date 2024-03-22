const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, M, T, nJobBoard, timeBoard) {
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  const MOVEMENT_TIME = 1;
  const [NOT_WORK, WORK] = [0, 1];

  const dp = Array.from(Array(N), () =>
    Array.from(Array(M), () => Array.from(Array(T + 1), () => Array(2).fill(null)))
  );

  dp[0][0][T][NOT_WORK] = 0;
  dp[0][0][T][WORK] = 0;

  for (let row = 0; row < N; row += 1) {
    for (let col = 0; col < M; col += 1) {
      const nJob = nJobBoard[row][col];
      const execTime = timeBoard[row][col];

      for (let time = execTime; time < T + 1; time += 1) {
        if (dp[row][col][time][NOT_WORK] !== null) {
          dp[row][col][time - execTime][WORK] = dp[row][col][time][NOT_WORK] + nJob;
        }
      }

      for (const [dr, dc] of DIRECTIONS) {
        const nr = row + dr;
        const nc = col + dc;
        if (!dp[nr]?.[nc]) {
          continue;
        }

        for (let time = 0; time < T + 1; time += 1) {
          const [prevNotWork, prevWork] = dp[row][col][time];
          if (time - MOVEMENT_TIME < 0) {
            continue;
          }

          if (prevNotWork !== null || prevWork !== null) {
            dp[nr][nc][time - MOVEMENT_TIME][NOT_WORK] = Math.max(
              dp[nr][nc][time - MOVEMENT_TIME][NOT_WORK] ?? 0,
              prevNotWork ?? 0,
              prevWork ?? 0
            );
          }
        }
      }
    }
  }

  return Math.max(...dp[N - 1][M - 1].flat());
}

const [N, M, T] = input.shift().split(' ').map(Number);
const nJobBoard = input.splice(0, N).map((line) => line.split(' ').map(Number));
const timeBoard = input.splice(0, N).map((line) => line.split(' ').map(Number));
console.log(solution(N, M, T, nJobBoard, timeBoard));
