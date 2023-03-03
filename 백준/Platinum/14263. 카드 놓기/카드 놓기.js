const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

// 40 % 대에서 틀림

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

      if (this.compare(this.heap[cur], this.heap[next]) < 0) break;

      this.swap(cur, next);
      cur = next;
    }
  }
  isEmpty() {
    return this.heap.length === 0;
  }
}

function solution(N, M, board) {
  const { graph, indegree, isValid } = init(N, M, board);

  if (!isValid) {
    return -1;
  }

  const path = [];
  const minHeap = new Heap((a, b) => (a < b ? -1 : 1));
  for (const [card, value] of indegree.entries()) {
    if (value === 0) minHeap.push(card);
  }

  while (!minHeap.isEmpty()) {
    const cur = minHeap.pop();
    const adjacent = [...graph.get(cur)];

    path.push(cur);

    for (const next of adjacent) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) minHeap.push(next);
    }
  }

  return path.length === graph.size ? path.join("") : -1;
}

function init(N, M, board) {
  let isValid = true;
  const position = new Map();
  const graph = new Map();
  const indegree = new Map();
  const overlap = Array.from(Array(N), () =>
    Array.from(Array(M), () => new Set())
  );

  board.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === ".") return;
      if (!graph.has(col)) {
        graph.set(col, new Set());
        indegree.set(col, 0);

        position.set(col, {
          minRow: rowIdx,
          maxRow: rowIdx,
          minCol: colIdx,
          maxCol: colIdx,
        });
        return;
      }

      const prev = position.get(col);
      prev.minRow = Math.min(prev.minRow, rowIdx);
      prev.maxRow = Math.max(prev.maxRow, rowIdx);
      prev.minCol = Math.min(prev.minCol, colIdx);
      prev.maxCol = Math.max(prev.maxCol, colIdx);
    });
  });

  for (const [key, value] of position.entries()) {
    for (let row = value.minRow; row <= value.maxRow; row++) {
      for (let col = value.minCol; col <= value.maxCol; col++) {
        if (board[row][col] === ".") {
          isValid = false;
        }
        overlap[row][col].add(key);
      }
    }
  }

  board.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col === ".") return;
      const top = col;

      const overlapped = overlap[rowIdx][colIdx];
      [...overlapped].forEach((card) => {
        if (card === top) return;

        if (graph.get(card).has(top)) return;
        graph.get(card).add(top);
        indegree.set(top, indegree.get(top) + 1);
      });
    });
  });

  return { graph, indegree, isValid };
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const board = input.map((row) => row.trim().split(""));
console.log(solution(N, M, board));
