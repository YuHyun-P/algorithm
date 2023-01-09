const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, edge) {
  const tree = new Map(edge);
  const preOrder = [];
  const inOrder = [];
  const postOrder = [];

  const recur = (cur) => {
    const [left, right] = tree.get(cur);
    preOrder.push(cur);
    if (left !== ".") {
      recur(left);
    }
    inOrder.push(cur);
    if (right !== ".") {
      recur(right);
    }
    postOrder.push(cur);
  };
  recur("A");

  return [preOrder.join(""), inOrder.join(""), postOrder.join("")];
}

const N = Number(input.shift().trim());
const edge = input.map((row) => {
  const [parent, ...children] = row.trim().split(" ");
  return [parent, children];
});

console.log(solution(N, edge).join("\n"));
