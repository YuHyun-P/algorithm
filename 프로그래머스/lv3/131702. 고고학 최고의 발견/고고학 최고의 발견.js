function solution(clockHands) {
  let min = Infinity;
  const n = clockHands.length;
  const dr = [0, 0, 1, 0, -1];
  const dc = [0, 1, 0, -1, 0];

  const isSolved = (clockHands) =>
    clockHands.every((row) => row.every((col) => col % 4 === 0));
  const outOfBound = (r, c) => r < 0 || c < 0 || n <= r || n <= c;
  const rotate = (r, c, degree, clockHands) => {
    if (degree === 0) return;

    for (let dir = 0; dir < dr.length; dir++) {
      const nextR = r + dr[dir];
      const nextC = c + dc[dir];
      if (outOfBound(nextR, nextC)) continue;

      clockHands[nextR][nextC] = (clockHands[nextR][nextC] + degree) % 4;
    }
  };

  for (let i = 0; i < 4 ** n; i++) {
    let count = 0;
    const curClockHands = clockHands.map((row) => [...row]);

    let quaternary = i;
    for (let c = 0; c < n; c++) {
      const degree = quaternary % 4;
      rotate(0, c, degree, curClockHands);
      count += degree;
      quaternary = Math.floor(quaternary / 4);
    }
      
    for (let r = 1; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const degree = (4 - curClockHands[r - 1][c]) % 4;
        rotate(r, c, degree, curClockHands);
        count += degree;
      }
    }

    if (isSolved(curClockHands)) {
      min = Math.min(min, count);
    }
  }

  return min;
}