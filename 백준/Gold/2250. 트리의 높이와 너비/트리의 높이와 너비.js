const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, children, root) {
  const EMPTY = -1;
  const LEFT = 0;
  const RIGHT = 1;
  const levelMap = (() => {
    const map = new Map();
    let order = 1;

    const record = (level) => {
      if (map.has(level)) map.get(level)[RIGHT] = order;
      else map.set(level, [order, order]);
      order += 1;
    };

    const max = () => {
      let maxWidth = 0;
      let maxLevel = Infinity;

      for (const [level, range] of map.entries()) {
        const cur = range[RIGHT] - range[LEFT] + 1;
        if (cur < maxWidth) continue;
        if (maxWidth === cur && maxLevel < level) continue;

        maxWidth = cur;
        maxLevel = level;
      }

      return [maxLevel, maxWidth];
    };

    return { record, max };
  })();

  const inorder = (root, level) => {
    children[root][LEFT] !== EMPTY && inorder(children[root][LEFT], level + 1);
    levelMap.record(level);
    children[root][RIGHT] !== EMPTY &&
      inorder(children[root][RIGHT], level + 1);
  };

  inorder(root, 1);
  return levelMap.max().join(" ");
}

function init(N, node) {
  const isRoot = Array(N + 1).fill(true);
  const children = Array.from(Array(N + 1), () => []);

  isRoot[0] = false;
  node.forEach((row) => {
    const [cur, left, right] = row.split(" ").map(Number);
    children[cur].push(left, right);
    if (left !== -1 && isRoot[left]) isRoot[left] = false;
    if (right !== -1 && isRoot[right]) isRoot[right] = false;
  });

  return [children, isRoot.findIndex((answer) => answer)];
}

const N = Number(input.shift());
console.log(solution(N, ...init(N, input)));
