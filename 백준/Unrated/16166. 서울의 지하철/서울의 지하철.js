const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, target, lineStations) {
  const SOURCE = 0;
  const MAX_STATION = 2 ** 32 - 1;

  const graph = new Map();

  const isLine = (index) => MAX_STATION < index;
  const isCycle = (stations) =>
    1 < stations.length && stations[0] === stations.at(-1);
  const bfs = () => {
    let head = 0;
    const queue = [[SOURCE, 0]];
    const visited = new Set();

    while (queue.length - head) {
      const [cur, nStation] = queue[head++];

      for (const next of graph.get(cur)) {
        if (visited.has(next)) continue;

        visited.add(next);
        queue.push([next, nStation + (isLine(next) ? 1 : 0)]);

        if (next === target) return nStation - 1;
      }
    }

    return -1;
  };

  lineStations.forEach((row, index) => {
    const [K, ...stations] = row.split(" ").map(Number);
    const line = MAX_STATION + 1 + index;
    if (isCycle(stations)) stations.pop();

    graph.set(line, stations);
    stations.forEach((station) => {
      if (graph.has(station)) graph.get(station).push(line);
      else graph.set(station, [line]);
    });
  });

  return bfs();
}

const N = Number(input.shift());
const target = Number(input.pop());
console.log(solution(N, target, input));
