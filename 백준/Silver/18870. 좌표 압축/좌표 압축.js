const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const xArray = input[1].trim().split(" ").map(Number);

const xArrayWithoutDuplicates = [...new Set(xArray)];
xArrayWithoutDuplicates.sort((a, b) => a - b);

const orderMap = new Map(xArrayWithoutDuplicates.map((x, order) => [x, order]));

console.log(xArray.map((x) => orderMap.get(x)).join(" "));
