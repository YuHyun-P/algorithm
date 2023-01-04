const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(enterLeave) {
  const company = new Set();
  enterLeave.forEach(([name, action]) => {
    switch (action) {
      case "enter":
        company.add(name);
        break;
      case "leave":
        company.delete(name);
        break;
    }
  });
  return [...company].sort().reverse();
}

input.shift();
const enterLeave = input.map((row) => row.trim().split(" "));
console.log(solution(enterLeave).join("\n"));
