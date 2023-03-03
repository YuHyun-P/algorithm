const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }
  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }
  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }
  hasParent(childIndex) {
    return 0 <= this.getParentIndex(childIndex);
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
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
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }
  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChild(cur)) {
      const nextIsRight =
        this.hasRightChild(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;
      const next = nextIsRight
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[next]) <= 0) break;
      this.swap(cur, next);
      cur = next;
    }
  }
  top() {
    return this.heap[0] ?? null;
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(N, planet) {
  const POSITION = 0;
  const VERTEX = 1;
  const X = 0;
  const Y = 1;
  const Z = 2;
  const DISTANCE = 2;

  const ascending = (a, b) => a[POSITION] - b[POSITION];
  const sorted = [
    planet.map(([x], i) => [x, i]).sort(ascending),
    planet.map(([_, y], i) => [y, i]).sort(ascending),
    planet.map(([_, __, z], i) => [z, i]).sort(ascending),
  ];

  let total = 0;
  const minHeap = new Heap((a, b) => a[DISTANCE] - b[DISTANCE]);
  const parent = Array.from(Array(N), (_, i) => i);

  const findParent = (vertex) => {
    if (vertex === parent[vertex]) return vertex;
    return (parent[vertex] = findParent(parent[vertex]));
  };
  const union = (vertexA, vertexB) => {
    const parentA = findParent(vertexA);
    const parentB = findParent(vertexB);
    if (parentA === parentB) return;
    parent[parentA] = parentB;
  };
  const isInSameSet = (vertexA, vertexB) => {
    return findParent(vertexA) === findParent(vertexB);
  };

  for (let i = 0; i < N - 1; i++) {
    for (const cur of sorted) {
      minHeap.push([
        cur[i][VERTEX],
        cur[i + 1][VERTEX],
        Math.abs(cur[i][POSITION] - cur[i + 1][POSITION]),
      ]);
    }
  }

  for (let edge = 0; edge < N - 1; edge++) {
    while (!minHeap.isEmpty()) {
      const [i, j, distance] = minHeap.top();
      if (isInSameSet(i, j)) minHeap.pop();
      else break;
    }

    const [i, j, distance] = minHeap.pop();
    union(i, j);
    total += distance;
  }

  return total;
}

const N = Number(input.shift().trim());
const planet = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, planet));
