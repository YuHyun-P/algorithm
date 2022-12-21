const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const S = fs.readFileSync(path).toString().trim();
const count = Array(26).fill(0);
for (const char of S) {
  const index = char.charCodeAt(0) - "a".charCodeAt(0);
  count[index] += 1;
}
console.log(count.join(" "));
