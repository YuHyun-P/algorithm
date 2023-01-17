const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, number) {
  const answer = [];
  number.forEach((str) => {
    if (str === "") {
      return;
    }
    answer.push(Number([...str.trim()].reverse().join("")));
  });
  answer.sort((a, b) => a - b);
  return answer.join("\n");
}

const [n, ...number] = input.flatMap((row) => row.split(" "));
console.log(solution(n, number));
