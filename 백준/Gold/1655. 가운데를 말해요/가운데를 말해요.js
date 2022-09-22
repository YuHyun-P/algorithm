class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * (parentIndex + 1);
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  getLeftChild(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }
  getRightChild(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)];
  }
  getParent(childIndex) {
    return this.heap[this.getParentIndex(childIndex)];
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  peek() {
    if (this.size() === 0) return null;
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  swap(indexOne, indexTwo) {
    [this.heap[indexOne], this.heap[indexTwo]] = [
      this.heap[indexTwo],
      this.heap[indexOne],
    ];
  }
}

class MaxHeap extends Heap {
  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  poll() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const value = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return value;
  }

  bubbleUp() {
    let curIndex = this.size() - 1;

    while (
      this.hasParent(curIndex) &&
      !this.pairIsInCorrectOrder(this.getParent(curIndex), this.heap[curIndex])
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
      const hasLargeRight =
        this.hasRightChild(curIndex) &&
        !this.pairIsInCorrectOrder(
          this.getLeftChild(curIndex),
          this.getRightChild(curIndex)
        );
      if (hasLargeRight) {
        nextIndex = this.getRightChildIndex(curIndex);
      } else {
        nextIndex = this.getLeftChildIndex(curIndex);
      }

      if (this.pairIsInCorrectOrder(this.heap[curIndex], this.heap[nextIndex]))
        break;

      this.swap(curIndex, nextIndex);
      curIndex = nextIndex;
    }
  }

  pairIsInCorrectOrder(firstValue, secondValue) {
    return firstValue >= secondValue;
  }

  toString() {
    return this.heap;
  }
}

class MinHeap extends Heap {
  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  poll() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();

    const value = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return value;
  }

  bubbleUp() {
    let curIndex = this.size() - 1;

    while (
      this.hasParent(curIndex) &&
      !this.pairIsInCorrectOrder(this.getParent(curIndex), this.heap[curIndex])
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
      const hasSmallerRight =
        this.hasRightChild(curIndex) &&
        !this.pairIsInCorrectOrder(
          this.getLeftChild(curIndex),
          this.getRightChild(curIndex)
        );
      if (hasSmallerRight) {
        nextIndex = this.getRightChildIndex(curIndex);
      } else {
        nextIndex = this.getLeftChildIndex(curIndex);
      }

      if (this.pairIsInCorrectOrder(this.heap[curIndex], this.heap[nextIndex]))
        break;

      this.swap(curIndex, nextIndex);
      curIndex = nextIndex;
    }
  }

  pairIsInCorrectOrder(firstValue, secondValue) {
    return firstValue <= secondValue;
  }
}

/* 입력 */
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const maxHeap = new MaxHeap();
const minHeap = new MinHeap();
let answer = "";
for (let line = 1; line < input.length; line++) {
  const num = Number(input[line]);

  const maxHeapSize = maxHeap.size();
  const minHeapSize = minHeap.size();
  if (maxHeapSize > minHeapSize) {
    minHeap.add(num);
  } else {
    maxHeap.add(num);
  }

  const maxHeapPeek = maxHeap.peek();
  const minHeapPeek = minHeap.peek();
  const needSwap = minHeapPeek !== null && maxHeapPeek > minHeapPeek;
  if (needSwap) {
    maxHeap.poll();
    minHeap.poll();

    maxHeap.add(minHeapPeek);
    minHeap.add(maxHeapPeek);
  }

  const mediumValue = maxHeap.peek();
  answer += String(mediumValue) + "\n";
}

console.log(answer.trim());
