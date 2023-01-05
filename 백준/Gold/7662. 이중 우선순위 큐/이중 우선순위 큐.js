const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

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
    return this.getLeftChild(parentIndex) !== undefined ? true : false;
  }

  hasRightChild(parentIndex) {
    return this.getRightChild(parentIndex) !== undefined ? true : false;
  }

  hasParent(childIndex) {
    return this.getParent(childIndex) !== undefined ? true : false;
  }

  swap(indexOne, indexTwo) {
    [this.heap[indexOne], this.heap[indexTwo]] = [
      this.heap[indexTwo],
      this.heap[indexOne],
    ];
  }

  bubbleUp() {
    let curIndex = this.heap.length - 1;

    while (
      this.hasParent(curIndex) &&
      Math.sign(
        this.compareFn(this.heap[curIndex], this.getParent(curIndex))
      ) === -1
    ) {
      const parentIndex = this.getParentIndex(curIndex);
      this.swap(curIndex, parentIndex);
      curIndex = parentIndex;
    }
  }

  bubbleDown() {
    let curIndex = 0;
    let nextIndex = null;

    while (this.hasLeftChild(curIndex)) {
      nextIndex = this.getLeftChildIndex(curIndex);

      if (
        this.hasRightChild(curIndex) &&
        Math.sign(
          this.compareFn(
            this.getLeftChild(curIndex),
            this.getRightChild(curIndex)
          )
        ) === 1
      ) {
        nextIndex = this.getRightChildIndex(curIndex);
      }

      if (
        Math.sign(this.compareFn(this.heap[curIndex], this.heap[nextIndex])) !==
        1
      ) {
        break;
      }

      this.swap(curIndex, nextIndex);
      curIndex = nextIndex;
    }
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  delete() {
    if (this.isEmpty()) {
      return undefined;
    }

    this.swap(0, this.heap.length - 1);
    const value = this.heap.pop();
    this.bubbleDown();
    return value;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  debug() {
    return this.heap;
  }

  size() {
    return this.heap.length;
  }

  top() {
    return this.heap[0];
  }
}

const T = Number(input[0]);
let cursor = 1;
let result = "";

const trim = (heap, map) => {
  while (heap.size()) {
    let num = heap.top();
    if (map.get(num) > 0) {
      break;
    }
    heap.delete();
  }
};

for (let t = 0; t < T; t++) {
  let k = Number(input[cursor++]);
  const minHeap = new Heap((a, b) => a - b);
  const maxHeap = new Heap((a, b) => b - a);
  const map = new Map();
  while (k--) {
    const [command, value] = input[cursor++].split(" ");
    switch (command) {
      case "I":
        const num = Number(value);
        minHeap.insert(num);
        maxHeap.insert(num);
        map.set(num, (map.get(num) ?? 0) + 1);
        break;
      case "D":
        const heap = value === "1" ? maxHeap : minHeap;
        trim(heap, map);
        if (!heap.size()) {
          break;
        }
        const deletedNum = heap.delete();
        map.set(deletedNum, map.get(deletedNum) - 1);
        break;
    }
  }

  trim(maxHeap, map);
  trim(minHeap, map);
  result +=
    maxHeap.size() === 0 ? "EMPTY\n" : `${maxHeap.top()} ${minHeap.top()}\n`;
}

console.log(result.trimEnd());
