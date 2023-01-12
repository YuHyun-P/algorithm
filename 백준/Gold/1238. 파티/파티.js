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
  hasLeftChild(parent) {
    return this.getLeftChildIndex(parent) < this.heap.length;
  }
  hasRightChild(parent) {
    return this.getRightChildIndex(parent) < this.heap.length;
  }
  hasParent(child) {
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
    while (this.hasLeftChild(cur)) {
      const nextIsRightChild =
        this.hasRightChild(cur) &&
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
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }
  heapifyUp() {
    let cur = this.heap.length - 1;
    while (
      this.hasParent(cur) &&
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

function solution(N, X, edge) {
  const REVERSE = true;
  const forward = dijkstra(N, X, edge, REVERSE);
  const backward = dijkstra(N, X, edge);
  let max = 0;

  // console.log(forward, backward);

  for (let index = 1; index < N + 1; index++) {
    max = Math.max(max, forward[index] + backward[index]);
  }

  return max;
}

function dijkstra(N, src, edge, reverse = false) {
  const TIME = 1;
  const minHeap = new PriorityQueue((a, b) => a[TIME] - b[TIME]);
  const graph = Array.from(Array(N + 1), () => []);
  const distance = Array(N + 1).fill(Infinity);

  distance[src] = 0;
  edge.forEach((row) => {
    let [a, b, t] = row.trim().split(" ").map(Number);
    if (reverse) {
      [a, b] = [b, a];
    }

    if (a === src) {
      distance[b] = t;
      minHeap.push([b, distance[b]]);
    }

    graph[a].push([b, t]);
  });

  while (!minHeap.isEmpty()) {
    const [cur, curDistance] = minHeap.pop();
    if (distance[cur] !== curDistance) {
      continue;
    }

    for (const [next, time] of graph[cur]) {
      if (distance[next] <= distance[cur] + time) {
        continue;
      }

      distance[next] = distance[cur] + time;
      minHeap.push([next, distance[next]]);
    }
  }

  return distance;
}

const [N, M, X] = input.shift().trim().split(" ").map(Number);
console.log(solution(N, X, input));
