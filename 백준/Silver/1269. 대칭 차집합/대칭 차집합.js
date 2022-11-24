const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [A, B] = input[0].trim().split(" ").map(Number);
const setA = new Set(input[1].trim().split(" ").map(Number));
const arrayB = input[2].trim().split(" ").map(Number);
const intersection = arrayB.filter((num) => setA.has(num));

console.log(A + B - 2 * intersection.length);
