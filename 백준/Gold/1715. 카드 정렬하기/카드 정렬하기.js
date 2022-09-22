class Heap {
  constructor(compareFn) {
    this.heap = [];
    this.compareFn = compareFn;
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

  size() {
    return this.heap.length;
  }

  swap(indexOne, indexTwo) {
    [this.heap[indexOne], this.heap[indexTwo]] = [
      this.heap[indexTwo],
      this.heap[indexOne],
    ];
  }

  add(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
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
      const canSwapWithRight =
        this.hasRightChild(curIndex) &&
        !this.pairIsInCorrectOrder(
          this.getLeftChild(curIndex),
          this.getRightChild(curIndex)
        );

      nextIndex = canSwapWithRight
        ? this.getRightChildIndex(curIndex)
        : this.getLeftChildIndex(curIndex);

      if (this.pairIsInCorrectOrder(this.heap[curIndex], this.heap[nextIndex]))
        break;

      this.swap(curIndex, nextIndex);
      curIndex = nextIndex;
    }
  }

  pairIsInCorrectOrder(firstValue, secondValue) {
    return this.compareFn(firstValue, secondValue) <= 0;
  }

  toString() {
    return this.heap;
  }
}

/* 입력 */
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

/* 풀이 */
const N = Number(input[0]);

if (N === 1) {
  console.log(0);
  return;
}

const minHeap = new Heap((a, b) => a - b);
for (let line = 1; line < 1 + N; line++) {
  const cardSize = Number(input[line]);
  minHeap.add(cardSize);
}

let answer = 0;
while (minHeap.size() > 1) {
  const minCardSizeOne = minHeap.poll();
  const minCardSizeTwo = minHeap.poll();
  const newCardSize = minCardSizeOne + minCardSizeTwo;

  answer += newCardSize;

  if (minHeap.size() === 0) break;

  minHeap.add(newCardSize);
}

if (minHeap.peek() !== null) {
  answer += minHeap.poll();
}

console.log(answer);
