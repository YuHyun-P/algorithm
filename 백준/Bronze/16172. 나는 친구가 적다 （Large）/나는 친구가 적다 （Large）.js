const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const S = input[0].replaceAll(/\d/g, "");
const word = input[1];
console.log(S.includes(word) ? 1 : 0);
