# 체스판 다시 칠하기 2

## 용어

- White board: 시작점이 흰색으로 시작하는 체스판
- Black board: 시작점이 검은색으로 시작하는 체스판

```
# White board
WB
BE

# Black board
BW
WB
```

## 알아야 하는 점

- 1️⃣ White board 일 때, 체스판 칸의 행과 열의 합이 짝수라면 흰색칸이고 홀수라면 검은색칸이다.
- 2️⃣ Black board로 만들기 위해 다시 칠해야 하는 칸의 개수와 White board로 만들기 위해 다시 칠해야 하는 칸의 개수를 더한 값은 체스판 칸의 총개수이다.

## 코드 설명

```js
...

/* 입력값 파싱 */
const [N, M, K] = input[0].trim().split(" ").map(Number);
const board = [];
fill(1, 1 + N, board);

/* 풀이 */
const prefixSum = getPrefixSum(N, M, board);

let min = Infinity;
for (let row = 0; row < N + 1 - K; row++) {
  for (let col = 0; col < M + 1 - K; col++) {
    // paintCellCount: 체스판의 시작점이 [row][col]일 때 KxK 보드를 체스판으로 만들기 위해 다시 칠해야 하는 정사각형의 개수
    const [rightBottomRow, rightBottomCol] = [row + K, col + K];
    const paintCellCount =
      prefixSum[row][col] -
      prefixSum[rightBottomRow][col] -
      prefixSum[row][rightBottomCol] +
      prefixSum[rightBottomRow][rightBottomCol];

    // 다시 칠해야 하는 정사각형의 개수 업데이트
    min = Math.min(min, paintCellCount, K * K - paintCellCount); // 2️⃣
  }
}

console.log(min);



function getColorAt(row, col) {
  return (row + col) % 2 === 0 ? "W" : "B"; // 1️⃣
}

function getPrefixSum(N, M, board) {
  const prefixSum = Array.from(Array(N + 1), () => Array(M + 1).fill(0));

  // White board로 만들기 위해 색칠해야 하는 칸이면 1, 아니라면 0
  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      prefixSum[rowIndex + 1][colIndex + 1] =
        getColorAt(rowIndex, colIndex) === col ? 0 : 1;
    })
  );

  // 행방향 누적합
  for (let row = 1; row < N + 1; row++) {
    for (let col = 1; col < M + 1; col++) {
      prefixSum[row][col] += prefixSum[row][col - 1];
    }
  }

  // 열방향 누적합
  for (let col = 1; col < M + 1; col++) {
    for (let row = 1; row < N + 1; row++) {
      prefixSum[row][col] += prefixSum[row - 1][col];
    }
  }

  return prefixSum;
};
```
