function solution(rectangle, characterX, characterY, itemX, itemY) {
  const PAD = 1;
  const LIMIT = 50;
  const MULTIPLE = 2;
  const N = LIMIT * MULTIPLE + PAD;

  const OUTER = -1;
  const LINE = 0;
  const INNER = 1;

  const direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  characterX *= MULTIPLE;
  characterY *= MULTIPLE;
  itemX *= MULTIPLE;
  itemY *= MULTIPLE;
  const expandedRect = rectangle.map((xy) => xy.map((num) => num * MULTIPLE));

  const board = Array.from(Array(N), () => Array(N).fill(OUTER));
  const outOfBound = (x, y) => x < 0 || y < 0 || N <= x || N <= y;
  const fill = ([minX, minY, maxX, maxY]) => {
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (board[y][x] === INNER) continue;

        const isLine = y === minY || y === maxY || x === minX || x === maxX;
        if (isLine) board[y][x] = LINE;
        else board[y][x] = INNER;
      }
    }
  };
  const bfs = () => {
    let head = 0;
    const queue = [[characterY, characterX]];
    const distance = Array.from(Array(N), () => Array(N).fill(-1));
    distance[characterY][characterX] = 0;

    while (queue.length - head) {
      const [y, x] = queue[head++];

      for (let i = 0; i < direction.length; i++) {
        const [dy, dx] = direction[i];
        const ny = y + dy;
        const nx = x + dx;

        if (outOfBound(ny, nx)) continue;
        if (board[ny][nx] !== LINE) continue;
        if (distance[ny][nx] >= 0) continue;

        distance[ny][nx] = distance[y][x] + 1;
        queue.push([ny, nx]);
      }
    }

    return distance[itemY][itemX];
  };

  expandedRect.forEach(fill);
  return bfs() / MULTIPLE;
}