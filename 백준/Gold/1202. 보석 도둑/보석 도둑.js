const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class PriorityQueue {
  constructor(compare) {
    this.heap = [null];
    this.compare = compare;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  empty() {
    return this.heap.length === 1;
  }

  top() {
    return this.heap[1];
  }

  push(item) {
    this.heap.push(item);
    this.heapifyUp();
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while (
      currentIndex > 1 &&
      this.compare(this.heap[currentIndex], this.heap[parentIndex])
    ) {
      this.swap(currentIndex, parentIndex);

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    if (this.heap.length === 1) {
      return;
    }
    if (this.heap.length === 2) {
      return this.heap.pop();
    }

    const result = this.heap[1];
    this.heap[1] = this.heap.pop();
    this.heapifyDown();
    return result;
  }

  heapifyDown() {
    let currentIndex = 1;
    let leftChildIndex = currentIndex * 2;
    let rightChildIndex = currentIndex * 2 + 1;

    if (!this.heap[leftChildIndex]) {
      return;
    }

    while (
      currentIndex < this.heap.length &&
      (this.compare(this.heap[leftChildIndex], this.heap[currentIndex]) ||
        this.compare(this.heap[rightChildIndex], this.heap[currentIndex]))
    ) {
      let compareIndex;

      if (rightChildIndex > this.heap.length - 1) {
        compareIndex = leftChildIndex;
      } else {
        compareIndex = this.compare(
          this.heap[leftChildIndex],
          this.heap[rightChildIndex]
        )
          ? leftChildIndex
          : rightChildIndex;
      }

      this.swap(currentIndex, compareIndex);

      currentIndex = compareIndex;
      leftChildIndex = currentIndex * 2;
      rightChildIndex = currentIndex * 2 + 1;
    }
  }
}

function solution(jewellery, bag) {
  const maxPQ = new PriorityQueue((a, b) => a > b);
  jewellery.sort(([mA, vA], [mB, vB]) => (mA - mB !== 0 ? mA - mB : vB - vA));
  bag.sort((a, b) => a - b);
  let cur = 0;
  let total = 0;

  bag.forEach((bagC) => {
    for (; cur < jewellery.length; cur++) {
      const [curM, curV] = jewellery[cur];
      if (bagC < curM) {
        break;
      }

      maxPQ.push(curV);
    }

    if (!maxPQ.empty()) {
      const maxV = maxPQ.pop();
      total += maxV;
    }
  });
  return total;
}

const [N, K] = input.shift().trim().split(" ").map(Number);
const jewellery = input
  .splice(0, N)
  .map((row) => row.trim().split(" ").map(Number));
const bag = input.map((row) => Number(row.trim()));

console.log(solution(jewellery, bag));
