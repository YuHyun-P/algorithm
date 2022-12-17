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

class MaxHeap extends Heap {
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
      this.getParent(curIndex) < this.heap[curIndex]
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
        this.getRightChild(curIndex) > this.getLeftChild(curIndex)
      ) {
        nextIndex = this.getRightChildIndex(curIndex);
      } else {
        nextIndex = this.getLeftChildIndex(curIndex);
      }

      if (this.heap[curIndex] >= this.heap[nextIndex]) break;

      this.swap(curIndex, nextIndex);
      curIndex = nextIndex;
    }
  }
}

function solution(n, k, enemy) {
    if (enemy.length <= k) {
        return enemy.length;
    }
    
    const history = new MaxHeap();
    let round = 0;
    while (round < enemy.length) {
        if (n >= enemy[round]) {
            n -= enemy[round];
            history.add(enemy[round]);
            round++;
            continue;
        }
        
        if (k > 0) {
            if (history.peek() !== null && history.peek() > enemy[round]) {
                n = n + history.poll() - enemy[round];
                history.add(enemy[round])
            }
            k -= 1;
            round++;
            continue;
        }
        
        break;
    }
    return round;
}