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
    return this.getLeftChildIndex(parent) < this.heap.length;
  }
  hasRightChildIndex(parent) {
    return this.getRightChildIndex(parent) < this.heap.length;
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

      if (this.compare(this.heap[cur], this.heap[next]) <= 0) {
        break;
      }

      this.swap(cur, next);
      cur = next;
    }
  }
  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }
}

function solution(n, edge, src, dest) {
  const [distance, prev] = dijkstra(n, src, edge);
  const minPath = restore(src, dest, prev);
  return [distance[dest], minPath.length, minPath.join(" ")].join("\n");
}

function init(n, src) {
  const distance = Array(n + 1).fill(Infinity);
  const prev = Array(n + 1).fill(0);
  const graph = Array.from(Array(n + 1), () => []);
  distance[src] = 0;

  return [distance, prev, graph];
}

function dijkstra(n, src, edge) {
  const WEIGHT = 1;
  const [distance, prev, graph] = init(n, src);
  const minHeap = new PriorityQueue((a, b) => a[WEIGHT] - b[WEIGHT]);

  edge.forEach(([townU, townV, cost]) => {
    graph[townU].push([townV, cost]);
    if (townU === src && cost < distance[townV]) {
      distance[townV] = cost;
      prev[townV] = townU;
      minHeap.push([townV, cost]);
    }
  });

  while (!minHeap.isEmpty()) {
    const [cur, curDistance] = minHeap.pop();
    if (distance[cur] !== curDistance) {
      continue;
    }

    for (const [next, cost] of graph[cur]) {
      if (distance[next] <= distance[cur] + cost) {
        continue;
      }

      distance[next] = distance[cur] + cost;
      minHeap.push([next, distance[next]]);
      prev[next] = cur;
    }
  }

  return [distance, prev];
}

function restore(src, dest, prev) {
  const minPath = [dest];
  let cur = dest;
  while (prev[cur] !== src) {
    cur = prev[cur];
    minPath.push(cur);
  }
  minPath.push(src);
  return minPath.reverse();
}

const n = Number(input.shift().trim());
const m = Number(input.shift().trim());
const edge = input.map((row) => row.trim().split(" ").map(Number));
const [src, dest] = edge.pop();
console.log(solution(n, edge, src, dest));
