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
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  top() {
    return this.heap[0] ?? null;
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
    while (this.hasLeftChild(cur)) {
      const nextIsRight =
        this.hasRightChild(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;
      const nextChild = nextIsRight
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[nextChild]) < 0) {
        break;
      }

      this.swap(cur, nextChild);
      cur = nextChild;
    }
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
  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(N, problem) {
  const RAMEN = 1;
  let count = 0;
  const dayProblem = Array.from(Array(N + 1), () => []);
  const maxHeap = new Heap((a, b) => b[RAMEN] - a[RAMEN]);

  for (const [day, ramen] of problem) {
    dayProblem[day].push(ramen);
  }

  for (let day = N; 0 < day; day--) {
    for (const ramen of dayProblem[day]) maxHeap.push([day, ramen]);
    if (maxHeap.isEmpty()) continue;

    count += maxHeap.pop()[RAMEN];
  }

  return count;
}

const N = Number(input.shift());
const problem = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, problem));
