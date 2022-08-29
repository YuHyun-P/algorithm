function solution(board, skill) {
  const [m, n] = [board.length, board[0].length];
  const prefixSum = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  // 범위 cell에 누적할 값 채우기
  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    const degreeWithSign = type === 1 ? degree * -1 : degree;
    prefixSum[r1][c1] += degreeWithSign;
    prefixSum[r1][c2 + 1] += degreeWithSign * -1;
    prefixSum[r2 + 1][c2 + 1] += degreeWithSign;
    prefixSum[r2 + 1][c1] += degreeWithSign * -1;
  });

  // 행방향 누적합
  for (let r = 0; r < m; r++) {
    for (let c = 1; c < n; c++) {
      prefixSum[r][c] += prefixSum[r][c - 1];
    }
  }

  // 열방향 누적합
  for (let r = 1; r < m; r++) {
    for (let c = 0; c < n; c++) {
      prefixSum[r][c] += prefixSum[r - 1][c];
    }
  }

  // 파괴되지 않은 건물 세기
  let undestroyCount = 0;
  board.forEach((row, r) =>
    row.forEach((num, c) => {
      const afterSkillNum = num + prefixSum[r][c];
      if (afterSkillNum > 0) undestroyCount++;
    })
  );

  return undestroyCount;
}
