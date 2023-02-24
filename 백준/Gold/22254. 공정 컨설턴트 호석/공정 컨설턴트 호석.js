const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Heap {
  constructor(compare) {
    this.compare = compare;
    this.heap = [];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
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

function solution(N, X, query) {
  const compare = (cur, target) => {
    const LINE = 0;
    const TIME = 1;

    let maxTime = 0;
    const minHeap = new Heap((a, b) => a[TIME] - b[TIME] || a[LINE] - b[LINE]);
    Array(cur)
      .fill(0)
      .forEach((time, line) => minHeap.push([line, time]));

    for (const processTime of query) {
      const [line, time] = minHeap.pop();
      minHeap.push([line, time + processTime]);
      maxTime = Math.max(maxTime, time + processTime);
    }

    return target - maxTime;
  };
  const lowerBound = (left, right, target) => {
    while (left + 1 < right) {
      const mid = Math.floor((left + right) / 2);
      if (compare(mid, target) < 0) {
        left = mid;
      } else {
        right = mid;
      }
    }
    return right;
  };

  return lowerBound(0, N, X);
}

const [N, X] = input[0].trim().split(" ").map(Number);
const query = input[1].trim().split(" ").map(Number);
console.log(solution(N, X, query));
