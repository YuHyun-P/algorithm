const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, W, plum) {
  const START_TREE = 1;

  const maxPlumMap = (() => {
    const map = new Map();

    const toKey = (t, nMoved, tree) => {
      return [t, nMoved, tree].join(" ");
    };

    const get = (t, nMoved, tree) => {
      return map.get(toKey(t, nMoved, tree)) ?? -1;
    };

    const set = (t, nMoved, nPlum, tree) => {
      map.set(toKey(t, nMoved, tree), nPlum);
    };

    return { get, set, map };
  })();

  const dfs = (t, nMoved, nPlum, cur) => {
    if (t === plum.length) {
      return nPlum;
    }

    if (nPlum <= maxPlumMap.get(t, nMoved, cur)) {
      return nPlum;
    }

    maxPlumMap.set(t, nMoved, nPlum, cur);

    const canMove = nMoved + 1 <= W;

    if (plum[t] === cur) {
      return Math.max(
        dfs(t + 1, nMoved, nPlum + 1, cur),
        canMove ? dfs(t + 1, nMoved + 1, nPlum, plum[t]) : 0
      );
    }

    return Math.max(
      dfs(t + 1, nMoved, nPlum, cur),
      canMove ? dfs(t + 1, nMoved + 1, nPlum + 1, plum[t]) : 0
    );
  };

  return dfs(0, 0, 0, START_TREE);
}

const [T, W] = input.shift().split(" ").map(Number);
const plum = input.map(Number);
console.log(solution(T, W, plum));
