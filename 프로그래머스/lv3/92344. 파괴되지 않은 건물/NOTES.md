# 효율성 테스트를 통과하지 못한 코드

- `M`: board의 행 길이
- `N`: board의 열 길이
- `S`: skill의 길이

```js
function solution(board, skill) {
  const total = board.length * board[0].length;
  let destroyedcount = 0;

  // O(MN)
  const act = (singleSkill) => {
    const [type, r1, c1, r2, c2, degree] = singleSkill;
    const degreeWithSign = type === 2 ? degree : degree * -1;
    for (let i = r1; i <= r2; i++) {
      for (let j = c1; j <= c2; j++) {
        const prev = board[i][j];
        const next = board[i][j] + degreeWithSign;

        if (type === 1) {
          if (prev > 0 && next <= 0) destroyedcount++;
        } else {
          if (prev <= 0 && next > 0) destroyedcount--;
        }

        board[i][j] = next;
      }
    }
  };

  // O(MNS)
  skill.forEach((singleSkill) => act(singleSkill));

  return total - destroyedcount;
}
```

# 효율성 테스트를 통과하는 코드

## 누적합 알고리즘 적용

```js
function solution(board, skill) {
  const [m, n] = [board.length, board[0].length];
  const prefixSum = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  // O(S)
  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    const degreeWithSign = type === 1 ? degree * -1 : degree;
    prefixSum[r1][c1] += degreeWithSign;
    prefixSum[r1][c2 + 1] += degreeWithSign * -1;
    prefixSum[r2 + 1][c2 + 1] += degreeWithSign;
    prefixSum[r2 + 1][c1] += degreeWithSign * -1;
  });
  console.log(prefixSum);

  // 행방향 누적합, O(MN)
  for (let r = 0; r < m; r++) {
    for (let c = 1; c < n; c++) {
      prefixSum[r][c] += prefixSum[r][c - 1];
    }
  }
  console.log(prefixSum);

  // 열방향 누적합, O(MN)
  for (let r = 1; r < m; r++) {
    for (let c = 0; c < n; c++) {
      prefixSum[r][c] += prefixSum[r - 1][c];
    }
  }
  console.log(prefixSum);

  // 파괴되지 않은 건물 세기, O(MN)
  let undestroyCount = 0;
  board.forEach((row, r) =>
    row.forEach((num, c) => {
      const afterSkillNum = num + prefixSum[r][c];
      if (afterSkillNum > 0) undestroyCount++;
    })
  );

  // O(3MN + S) = O(MN)
  return undestroyCount;
}
```

> 참고한 블로그 [누적합의 확장, imos법](https://driip.me/65d9b58c-bf02-44bf-8fba-54d394ed21e0)
