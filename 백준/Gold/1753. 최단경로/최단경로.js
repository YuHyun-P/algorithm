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
    return this.getLeftChildIndex(parent) < this.size();
  }
  hasRightChild(parent) {
    return this.getRightChildIndex(parent) < this.size();
  }
  hasParent(child) {
    return 0 <= this.getParentIndex(child);
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
  push(value) {
    this.heap.push(value);
    this.heapifyUp();
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
  heapifyUp() {
    let cur = this.heap.length - 1;
    while (
      this.hasParent(cur) &&
      this.compare(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0
    ) {
      const parent = this.getParentIndex(cur);
      this.swap(cur, parent);
      cur = parent;
    }
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this.heap.length;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(V, K, edge) {
  const WEIGHT = 1;
  const [distance, graph] = init(V, K, edge);

  const minHeap = new PriorityQueue((a, b) => a[WEIGHT] - b[WEIGHT]);
  graph[K].forEach(([node, weight]) => {
    distance[node] = weight;
    minHeap.push([node, weight]);
  });

  while (!minHeap.isEmpty()) {
    const [cur, curDistance] = minHeap.pop();
    if (distance[cur] !== curDistance) {
      continue;
    }

    for (const [next, nextWight] of graph[cur]) {
      if (distance[next] < distance[cur] + nextWight) {
        continue;
      }

      distance[next] = distance[cur] + nextWight;
      minHeap.push([next, distance[next]]);
    }
  }

  return distance
    .slice(1)
    .map((d) => (d === Infinity ? "INF" : `${d}`))
    .join("\n");
}

function init(V, K, edge) {
  const distance = Array(V + 1).fill(Infinity);
  distance[K] = 0;

  const graph = Array.from(Array(V + 1), () => new Map());
  edge.forEach((row) => {
    const [u, v, w] = row.trim().split(" ").map(Number);
    graph[u].set(v, Math.min(graph[u].get(v) ?? Infinity, w));
  });
  return [distance, graph.map((adjacent) => [...adjacent.entries()])];
}

const [V, E] = input.shift().trim().split(" ").map(Number);
const K = Number(input.shift().trim());
console.log(solution(V, K, input));
