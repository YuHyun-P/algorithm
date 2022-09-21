class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getLeftChild(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }

  getRightChildIndex(parentIndex) {
    return 2 * (parentIndex + 1);
  }
  getRightChild(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)];
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }
  getParent(childIndex) {
    return this.heap[this.getParentIndex(childIndex)];
  }
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  swap(indexOne, indexTwo) {
    [this.heap[indexOne], this.heap[indexTwo]] = [
      this.heap[indexTwo],
      this.heap[indexOne],
    ];
  }

  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }
}

class MinHeap extends Heap {
  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  poll() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const value = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return value;
  }

  bubbleUp() {
    let curIndex = this.heap.length - 1;

    while (
      this.hasParent(curIndex) &&
      this.heap[curIndex] < this.getParent(curIndex)
    ) {
      const nextIndex = this.getParentIndex(curIndex);

      this.swap(curIndex, nextIndex);
      curIndex = nextIndex;
    }
  }

  bubbleDown() {
    let curIndex = 0;
    let nextIndex = null;

    while (this.hasLeftChild(curIndex)) {
      if (
        this.hasRightChild(curIndex) &&
        this.getRightChild(curIndex) < this.getLeftChild(curIndex)
      ) {
        nextIndex = this.getRightChildIndex(curIndex);
      } else {
        nextIndex = this.getLeftChildIndex(curIndex);
      }

      if (this.heap[curIndex] <= this.heap[nextIndex]) break;

      this.swap(curIndex, nextIndex);
      curIndex = nextIndex;
    }
  }
}

/* 입력 */
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

/* 풀이 */
const minHeap = new MinHeap();
let answer = "";
for (let line = 1; line < 1 + N; line++) {
  const value = Number(input[line]);
  if (value === 0) {
    const peek = minHeap.peek();
    if (peek === null) {
      answer += "0";
    } else {
      answer += String(peek);
      minHeap.poll();
    }
    answer += "\n";
  } else {
    minHeap.add(value);
  }
}

console.log(answer.trim());
