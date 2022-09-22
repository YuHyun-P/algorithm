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
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  swap(indexOne, indexTwo) {
    [this.heap[indexOne], this.heap[indexTwo]] = [
      this.heap[indexTwo],
      this.heap[indexOne],
    ];
  }
}

class AbsoluteMinHeap extends Heap {
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
      if (
        this.hasRightChild(curIndex) &&
        this.pairIsInCorrectOrder(
          this.getRightChild(curIndex),
          this.getLeftChild(curIndex)
        )
      ) {
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
    const absFirstValue = Math.abs(firstValue);
    const absSecondValue = Math.abs(secondValue);

    if (absFirstValue < absSecondValue) return true;
    else if (absFirstValue === absSecondValue) return firstValue <= secondValue;
    return false;
  }
}

/* 입력 */
let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

/* 풀이 */
const absoluteMinHeap = new AbsoluteMinHeap();

let answer = "";
for (let line = 1; line < input.length; line++) {
  const value = Number(input[line]);
  if (value === 0) {
    if (absoluteMinHeap.peek() === null) {
      answer += "0";
    } else {
      answer += String(absoluteMinHeap.poll());
    }
    answer += "\n";
  } else {
    absoluteMinHeap.add(value);
  }
}

console.log(answer.trim());
