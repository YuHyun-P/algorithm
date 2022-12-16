const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const N = Number(input.shift().trim());
const rgbCost = input.map((line) => line.trim().split(" ").map(Number));
const RGB = 3;

for (let house = 1; house < N; house++) {
  const prevHouse = house - 1;
  for (let rgb = 0; rgb < RGB; rgb++) {
    switch (rgb) {
      case 0:
        rgbCost[house][rgb] += Math.min(
          rgbCost[prevHouse][1],
          rgbCost[prevHouse][2]
        );
        break;
      case 1:
        rgbCost[house][rgb] += Math.min(
          rgbCost[prevHouse][0],
          rgbCost[prevHouse][2]
        );
        break;
      case 2:
        rgbCost[house][rgb] += Math.min(
          rgbCost[prevHouse][0],
          rgbCost[prevHouse][1]
        );
        break;
      default:
        throw new Error("Invalid rgb");
    }
  }
}
console.log(Math.min(...rgbCost[N - 1]));
