const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class PriorityQueue {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }
  getLeftChildIndex(parent) {
    return 2 * parent + 1;
  }
  getRightChildIndex(parent) {
    return 2 * parent + 2;
  }
  getParentIndex(child) {
    return Math.floor((child - 1) / 2);
  }
  hasLeftChildIndex(parent) {
    return this.getLeftChildIndex(parent) < this.size();
  }
  hasRightChildIndex(parent) {
    return this.getRightChildIndex(parent) < this.size();
  }
  hasParentIndex(child) {
    return 0 <= this.getParentIndex(child);
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  top() {
    return this.heap[0] ?? null;
  }
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }
  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChildIndex(cur)) {
      const nextIsRightChild =
        this.hasRightChildIndex(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;
      const next = nextIsRightChild
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[next]) < 0) {
        break;
      }
      this.swap(cur, next);
      cur = next;
    }
  }
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  heapifyUp() {
    let cur = this.heap.length - 1;
    while (
      this.hasParentIndex(cur) &&
      this.compare(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0
    ) {
      this.swap(cur, this.getParentIndex(cur));
      cur = this.getParentIndex(cur);
    }
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

function solution(N, edge, v1, v2) {
  const graph = init(N, edge);
  const distanceSrc = dijkstra(1, N, graph);
  const distanceV1 = dijkstra(v1, N, graph);
  const distanceV2 = dijkstra(v2, N, graph);

  const min = Math.min(
    distanceSrc[v1] + distanceV1[v2] + distanceV2[N],
    distanceSrc[v2] + distanceV2[v1] + distanceV1[N]
  );

  return min === Infinity ? -1 : min;
}

function init(N, edge) {
  const graph = Array.from(Array(N + 1), () => []);
  edge.forEach(([a, b, c]) => {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  });
  return graph;
}

function dijkstra(start, N, graph) {
  const WEIGHT = 1;
  const minHeap = new PriorityQueue((a, b) => a[WEIGHT] - b[WEIGHT]);
  const distance = Array(N + 1).fill(Infinity);

  distance[start] = 0;
  graph[start].forEach(([adjacent, weight]) => {
    distance[adjacent] = weight;
    minHeap.push([adjacent, distance[adjacent]]);
  });

  while (!minHeap.isEmpty()) {
    const [cur, curDistance] = minHeap.pop();
    if (distance[cur] !== curDistance) {
      continue;
    }

    for (const [adjacent, weight] of graph[cur]) {
      if (distance[adjacent] < distance[cur] + weight) {
        continue;
      }

      distance[adjacent] = distance[cur] + weight;
      minHeap.push([adjacent, distance[adjacent]]);
    }
  }

  return distance;
}

const [N, E] = input.shift().trim().split(" ").map(Number);
const [v1, v2] = input.pop().trim().split(" ").map(Number);
const edge = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, edge, v1, v2));
