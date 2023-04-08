const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(n, room) {
  const [START, END] = [0, n - 1];
  const [EMPTY, LEPRE, TROLL] = ["E", "L", "T"];
  const [TYPE, PRICE, ADJACENT] = [0, 1, 2];

  if (room[START][TYPE] === TROLL) return "No";

  const maxBudget = Array(n).fill(-1);
  for (let i = 0; i < n; i++) {
    const [type, price, ...adjacent] = room[i].split(" ");
    adjacent.pop();
    room[i] = [type, Number(price), adjacent.map((num) => Number(num) - 1)];
  }

  const bfs = (startBudget) => {
    let head = 0;
    const queue = [[startBudget, START]];
    maxBudget[START] = startBudget;

    while (queue.length - head) {
      const [budget, cur] = queue[head++];

      for (const next of room[cur][ADJACENT]) {
        if (budget <= maxBudget[next]) continue;
        const [type, price] = room[next];
        maxBudget[next] = budget;

        if (type === TROLL) {
          if (budget < price) continue;
          queue.push([budget - price, next]);
        } else {
          queue.push([Math.max(budget, price), next]);
        }

        if (next === END) return "Yes";
      }
    }

    return "No";
  };

  return bfs(room[START][PRICE]);
}

let cursor = 0;
const answer = [];
while (input[cursor] !== "0") {
  let n = Number(input[cursor++]);
  const room = input.slice(cursor, cursor + n);
  answer.push(solution(n, room));
  cursor += n;
}

console.log(answer.join("\n"));
