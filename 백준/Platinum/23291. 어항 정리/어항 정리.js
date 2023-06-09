const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, initFishbowls) {
  let nOrganize = 0;
  let fishbowls = [[...initFishbowls]];

  const addFish = () => {
    const min = Math.min(...fishbowls[0]);
    fishbowls[0].forEach((nFish, index) => {
      if (nFish !== min) return;
      fishbowls[0][index] += 1;
    });
  };

  const levitate = (row, col) => {
    const levitated = Array.from(Array(row), (_, r) =>
      fishbowls[r].splice(0, col)
    );

    while (fishbowls[0].length === 0) {
      fishbowls.splice(0, 1);
    }

    return levitated;
  };

  const rotate = (levitated, times) => {
    let prev = levitated.map((row) => [...row]);

    while (times > 0) {
      let row = prev.length;
      let col = prev[0].length;
      let rotated = Array.from(Array(col), () => Array(row).fill(0));

      for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
          rotated[c][row - r - 1] = prev[r][c];
        }
      }

      prev = rotated;
      times -= 1;
    }

    return prev;
  };

  const pile = (levitated) => {
    fishbowls.unshift(...levitated);
  };

  const organizeGradually = () => {
    let row = 1;
    let col = 1;

    while (row <= fishbowls.at(-1).length - col) {
      const levitated = rotate(levitate(row, col), 1);
      pile(levitated);

      if (row === col) row += 1;
      else col += 1;
    }
  };

  const organizeTwice = () => {
    let row = 1;
    let col = fishbowls[0].length / 2;

    for (let iter = 0; iter < 2; iter++) {
      const levitated = rotate(levitate(row, col), 2);
      pile(levitated);

      row += 1;
      col /= 2;
    }
  };

  const calcDiff = (center, adjacent) => {
    const diff = Math.floor(Math.abs(center - adjacent) / 5);
    if (center < adjacent) return [diff, -diff];
    return [-diff, diff];
  };

  const adjust = () => {
    const adjusted = fishbowls.map((row) => [...row]);

    for (let r = 0; r < fishbowls.length; r++) {
      for (let c = 0; c < fishbowls[r].length; c++) {
        if (r + 1 < fishbowls.length) {
          const [dCenter, dDown] = calcDiff(
            fishbowls[r][c],
            fishbowls[r + 1][c]
          );
          adjusted[r][c] += dCenter;
          adjusted[r + 1][c] += dDown;
        }

        if (c + 1 < fishbowls[r].length) {
          const [dCenter, dRight] = calcDiff(
            fishbowls[r][c],
            fishbowls[r][c + 1]
          );
          adjusted[r][c] += dCenter;
          adjusted[r][c + 1] += dRight;
        }
      }
    }

    fishbowls = adjusted;
  };

  const flat = () => {
    const flatted = [[]];

    for (let c = 0; c < fishbowls.at(-1).length; c++) {
      for (let r = fishbowls.length - 1; 0 <= r; r--) {
        if (fishbowls[r].length <= c) continue;
        flatted[0].push(fishbowls[r][c]);
      }
    }

    fishbowls = flatted;
  };

  const organize = () => {
    nOrganize += 1;

    addFish();

    organizeGradually();
    adjust();
    flat();

    organizeTwice();
    adjust();
    flat();
  };

  const getMaxDiff = () => {
    let max = fishbowls[0][0];
    let min = fishbowls[0][0];
    fishbowls[0].forEach((nFish, index) => {
      if (max < nFish) max = nFish;
      if (nFish < min) min = nFish;
    });
    return max - min;
  };

  while (getMaxDiff() > K) {
    organize();
  }

  return nOrganize;
}

const [N, K] = input[0].split(" ").map(Number);
const fishbowls = input[1].split(" ").map(Number);
console.log(solution(N, K, fishbowls));
