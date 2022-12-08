const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

let [N, r, c] = input.map(Number);

const getAreaAt = (r, c, N) => {
  const [rPercent, cPercent] = [
    Math.floor(r / Math.pow(2, N - 1)),
    Math.floor(c / Math.pow(2, N - 1)),
  ];

  switch (rPercent) {
    case 0:
      return cPercent === 0 ? 0 : 1;
    case 1:
      return cPercent === 0 ? 2 : 3;
    default:
      throw new Error(rPercent);
  }
};

let rcOrder = 0;
while (N > 0) {
  const area = getAreaAt(r, c, N);
  rcOrder += Math.pow(4, N - 1) * area;

  switch (area) {
    case 0:
      break;
    case 1:
      c -= Math.pow(2, N - 1);
      break;
    case 2:
      r -= Math.pow(2, N - 1);
      break;
    case 3:
      r -= Math.pow(2, N - 1);
      c -= Math.pow(2, N - 1);
      break;
    default:
      throw new Error(area);
  }
  N -= 1;
}

console.log(rcOrder);
