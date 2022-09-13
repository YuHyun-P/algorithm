/* 입력 */

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const COMPUTER_NUM = parseInt(input[0], 10);
const EDGES_NUM = parseInt(input[1], 10);
const network = Array.from(Array(COMPUTER_NUM + 1), () => []);
for (let line = 2; line < input.length; line++) {
  const [computerA, computerB] = input[line]
    .trim()
    .split(" ")
    .map((str) => parseInt(str, 10));
  network[computerA].push(computerB);
  network[computerB].push(computerA);
}

/* 풀이 */
const getConnectedComponent = (start) => {
  // BFS
  const visited = Array(COMPUTER_NUM + 1).fill(false);
  visited[0] = visited[start] = true;
  const queue = [start];
  const connectedComponent = [];

  while (queue.length > 0) {
    const cur = queue.shift();
    connectedComponent.push(cur);

    network[cur].forEach((next) => {
      if (visited[next]) return;

      queue.push(next);
      visited[next] = true;
    });
  }

  return connectedComponent;
};

const WORM_COMPUTER = 1;
const answer = getConnectedComponent(WORM_COMPUTER);
console.log(answer.length - WORM_COMPUTER);
