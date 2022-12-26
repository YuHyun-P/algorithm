const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim();

function solution(n) {
  const order = [];
  const move = (n, source, target, rest) => {
    if (n <= 1) {
      order.push([source, target].join(" "));
      return;
    }

    move(n - 1, source, rest, target);
    order.push([source, target].join(" "));
    move(n - 1, rest, target, source);
  };
  move(n, 1, 3, 2);
  return order;
}

const order = solution(Number(input));
console.log(order.length);
console.log(order.join("\n"));
