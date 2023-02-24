const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
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
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(N, M, school) {
  const MIN = 0;
  const MAX = 10 ** 9;

  let minDiff = MAX - MIN;
  const max = { classroom: 0, student: 0 };
  const getAbility = (indexObj) => school[indexObj.classroom][indexObj.student];
  const minHeap = new Heap((a, b) => {
    return getAbility(a) - getAbility(b);
  });

  school.forEach((classroom, index) => {
    classroom.sort((a, b) => a - b);
    minHeap.push({ classroom: index, student: 0 });
    if (classroom[0] > getAbility(max)) {
      max.classroom = index;
      max.student = 0;
    }
  });

  while (!minHeap.isEmpty()) {
    const min = minHeap.pop();
    minDiff = Math.min(minDiff, getAbility(max) - getAbility(min));

    min.student += 1;

    if (min.student >= M) break;
    if (getAbility(min) > getAbility(max)) {
      max.classroom = min.classroom;
      max.student = min.student;
    }

    minHeap.push(min);
  }

  return minDiff;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const school = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, M, school));
