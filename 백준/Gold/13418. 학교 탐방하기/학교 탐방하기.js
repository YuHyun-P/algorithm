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
  hasLeftChildIndex(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }
  hasRightChildIndex(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }
  hasParentIndex(childIndex) {
    return 0 <= this.getParentIndex(childIndex);
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
    if (this.heap.length <= 1) {
      return this.heap.pop() ?? null;
    }
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }
  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChildIndex(cur)) {
      const nextIsRight =
        this.hasRightChildIndex(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;
      const nextChild = nextIsRight
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[nextChild]) < 0) break;

      this.swap(cur, nextChild);
      cur = nextChild;
    }
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(N, edge) {
  const VERTEX_A = 0;
  const VERTEX_B = 1;
  const WEIGHT = 2;

  const kruskalMST = (compare) => {
    const heap = new Heap(compare);
    const parent = Array.from(Array(N + 1), (_, i) => i);
    let mst = 0;

    const find = (v) => {
      if (parent[v] === v) return v;
      return (parent[v] = find(parent[v]));
    };
    const inSameSet = (vA, vB) => {
      return find(vA) === find(vB);
    };
    const union = (vA, vB) => {
      parent[find(vA)] = find(vB);
    };

    edge.forEach((cur) => heap.push(cur));
    for (let selected = 0; selected < N; selected++) {
      while (inSameSet(heap.top()[VERTEX_A], heap.top()[VERTEX_B])) {
        heap.pop();
      }

      const [A, B, C] = heap.pop();
      union(A, B);
      mst += C;
    }

    return mst;
  };

  const min = kruskalMST((a, b) => a[WEIGHT] - b[WEIGHT]);
  const max = kruskalMST((a, b) => b[WEIGHT] - a[WEIGHT]);

  return max ** 2 - min ** 2;
}

const [N, M] = input.shift().split(" ").map(Number);
const edge = input.map((row) => {
  const [A, B, C] = row.split(" ").map(Number);
  return [A, B, C === 0 ? 1 : 0];
});
console.log(solution(N, edge));
