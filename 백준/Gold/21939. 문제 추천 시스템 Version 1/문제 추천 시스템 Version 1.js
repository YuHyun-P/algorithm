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
    if (this.isEmpty()) {
      return null;
    }
    if (this.heap.length === 1) {
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
      const nextIsRight =
        this.hasRightChild(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;

      const child = nextIsRight
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[child]) < 0) {
        break;
      }

      this.swap(cur, child);
      cur = child;
    }
  }
  top() {
    return this.heap[0] ?? null;
  }
  isEmpty() {
    return this.heap.length === 0;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
}

function solution(input) {
  const P = 0;
  const L = 1;

  let cursor = 0;
  const N = Number(input[cursor++]);
  const minHeap = new Heap((a, b) => a[L] - b[L] || a[P] - b[P]);
  const maxHeap = new Heap((a, b) => b[L] - a[L] || b[P] - a[P]);
  const problemMap = new Map();

  const trim = (heap) => {
    while (!heap.isEmpty()) {
      const [p, l] = heap.top();
      if (problemMap.has(p) && problemMap.get(p) === l) {
        break;
      }

      heap.pop();
    }
  };

  while (cursor < N + 1) {
    const [p, l] = input[cursor++].trim().split(" ").map(Number);
    minHeap.push([p, l]);
    maxHeap.push([p, l]);
    problemMap.set(p, l);
  }

  const M = Number(input[cursor++]);
  const answer = [];
  while (cursor < N + M + 2) {
    const [command, ...argv] = input[cursor++].trim().split(" ");

    switch (command) {
      case "add":
        const [p, l] = argv.map(Number);
        minHeap.push([p, l]);
        maxHeap.push([p, l]);
        problemMap.set(p, l);
        break;
      case "recommend":
        const heap = argv[0] === "1" ? maxHeap : minHeap;
        trim(heap);
        answer.push(heap.top()[P]);
        break;
      case "solved":
        problemMap.delete(Number(argv[P]));
        break;
    }
  }

  return answer.join("\n");
}

console.log(solution(input));
