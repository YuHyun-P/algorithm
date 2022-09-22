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

  size() {
    return this.heap.length;
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
const [N, M] = input[0].split(" ").map(Number);

const indegree = Array(N + 1).fill(0);
const graph = Array.from(Array(N + 1), () => []);

for (let line = 1; line < 1 + M; line++) {
  const [A, B] = input[line].trim().split(" ").map(Number);
  graph[A].push(B);
  indegree[B] += 1;
}

const minHeap = new Heap((a, b) => a - b);
let order = "";

indegree.forEach((count, problem) => {
  const canSolve = problem !== 0 && count === 0;
  if (canSolve) minHeap.add(problem);
});

while (minHeap.size() > 0) {
  const problemA = minHeap.poll();
  order += `${problemA} `;

  graph[problemA].forEach((problemB) => {
    indegree[problemB] -= 1;
    const canSolve = indegree[problemB] === 0;
    if (canSolve) minHeap.add(problemB);
  });
}

console.log(order.trim());
