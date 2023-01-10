const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class PriorityQueue {
  constructor(compare) {
    this.heap = [];
    this.compare = (a, b) => Math.sign(compare(a, b));
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
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

  isEmpty() {
    return this.heap.length === 0;
  }

  top() {
    return this.heap[0] ?? null;
  }

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let cur = this.heap.length - 1;

    while (
      this.hasParent(cur) &&
      this.compare(this.heap[this.getParentIndex(cur)], this.heap[cur]) > 0
    ) {
      this.swap(cur, this.getParentIndex(cur));
      cur = this.getParentIndex(cur);
    }
  }

  pop() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return result;
  }

  heapifyDown() {
    let cur = 0;
    let next = null;

    while (this.hasLeftChild(cur)) {
      const rightChildIsNext =
        this.hasRightChild(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) <= 0;

      next = rightChildIsNext
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[next]) <= 0) {
        break;
      }

      this.swap(cur, next);
      cur = next;
    }
  }
}

function solution(N, edge) {
  const [indegree, graph] = init(N, edge);
  const order = [];
  const minHeap = new PriorityQueue((a, b) => a - b);
  for (let cur = 1; cur < indegree.length; cur++) {
    indegree[cur] === 0 && minHeap.push(cur);
  }

  while (!minHeap.isEmpty()) {
    const cur = minHeap.pop();
    order.push(cur);

    for (const next of graph[cur]) {
      indegree[next] -= 1;
      indegree[next] === 0 && minHeap.push(next);
    }
  }

  return order.join(" ");
}

function init(N, edge) {
  const indegree = Array(N + 1).fill(0);
  const graph = Array.from(Array(N + 1), () => []);

  edge.forEach((row) => {
    const [u, v] = row.split(" ").map(Number);
    graph[u].push(v);
    indegree[v] += 1;
  });

  return [indegree, graph];
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const edge = input;
console.log(solution(N, edge));
