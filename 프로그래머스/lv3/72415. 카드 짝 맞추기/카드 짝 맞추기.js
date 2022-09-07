function solution(board, r, c) {
  const LENGTH = 4;
  const targetMap = new Map();
  board.forEach((row, r) =>
    row.forEach((card, c) => {
      if (card === 0) return;

      targetMap.set(
        card,
        targetMap.get(card)
          ? { ...targetMap.get(card), B: [r, c] }
          : { A: [r, c] }
      );
    })
  );

  const permutations = [];
  const vertices = [...targetMap].flatMap(([card]) => [
    `${card} A`,
    `${card} B`,
  ]);
  const HEIGHT = vertices.length;

  vertices.forEach((start) => {
    const visited = {};
    vertices.forEach((vertex) => (visited[vertex] = false));

    const dfs = (start, order = [], level = 0) => {
      if (visited[start]) return;

      order.push(start);
      level++;
      visited[start] = true;

      if (level === HEIGHT) {
        permutations.push([...order]);
        order.pop();
        visited[start] = false;
        return;
      }

      if (level % 2 === 1) {
        const [card, ab] = start.split(" ");
        const nextVertex = ab === "A" ? `${card} B` : `${card} A`;
        dfs(nextVertex, order, level);
      } else {
        vertices.forEach((vertex) => {
          if (!visited[vertex]) {
            dfs(vertex, order, level);
          }
        });
      }
      order.pop();
      visited[start] = false;
    };

    dfs(start);
  });

  const isValid = ([r, c]) => 0 <= r && r < LENGTH && 0 <= c && c < LENGTH;
  const isCard = ([r, c], boardState) => boardState[r][c] !== 0;

  const getNextCtrlMove = (cur, direction, boardState) => {
    const [dr, dc] = direction;
    let [nextR, nextC] = cur;
    while (isValid([nextR + dr, nextC + dc])) {
      nextR += dr;
      nextC += dc;

      if (isCard([nextR, nextC], boardState)) {
        break;
      }
    }

    return [nextR, nextC];
  };

  const getDistance = (cur, next, boardState) => {
    const [curR, curC] = cur;
    const [nextR, nextC] = next;

    const rowFirstDistance =
      getMinHorizontal(curR, curC, nextC, boardState) +
      getMinVertical(nextC, curR, nextR, boardState);
    const columnFirstDistance =
      getMinVertical(curC, curR, nextR, boardState) +
      getMinHorizontal(nextR, curC, nextC, boardState);

    return Math.min(rowFirstDistance, columnFirstDistance);
  };

  const getMinHorizontal = (row, sourceC, targetC, boardState) => {
    if (sourceC === targetC) return 0;
    const dc = Math.sign(targetC - sourceC);
    let move = 0;
    let curC = sourceC;

    while (true) {
      const [_, nextC] = getNextCtrlMove([row, curC], [0, dc], boardState);
      move++;
      const isPassedTargetC = Math.sign(nextC - targetC) === dc;
      if (!isPassedTargetC) {
        if (nextC === targetC) return move;

        curC = nextC;
      } else {
        return Math.min(
          move + Math.abs(nextC - curC),
          move - 1 + Math.abs(curC - targetC)
        );
      }
    }
  };

  const getMinVertical = (column, sourceR, targetR, boardState) => {
    if (sourceR === targetR) return 0;
    const dr = Math.sign(targetR - sourceR);
    let move = 0;
    let curR = sourceR;

    while (true) {
      const [nextR, _] = getNextCtrlMove([curR, column], [dr, 0], boardState);
      move++;
      const isPassedTargetC = Math.sign(nextR - targetR) === dr;
      if (!isPassedTargetC) {
        if (nextR === targetR) return move;

        curR = nextR;
      } else {
        return Math.min(
          move + Math.abs(nextR - curR),
          move - 1 + Math.abs(curR - targetR)
        );
      }
    }
  };

  let minMove = Infinity;
  const ENTER = 1;
  permutations.forEach((order) => {
    let cur = [r, c];
    let move = 0;
    const boardState = board.map((row) => [...row]);

    for (let i = 0; i < order.length; i++) {
      const [card, ab] = order[i].split(" ");
      const next = targetMap.get(parseInt(card))[ab];
      const distance = getDistance(cur, next, boardState);
      move += distance + ENTER;
      boardState[next[0]][next[1]] = 0;
      cur = next;
    }

    minMove = Math.min(move, minMove);
  });

  return minMove;
}