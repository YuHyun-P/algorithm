class Heap {
    constructor(compare) {
        this.compare = compare;
        this.heap = [];
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
    isEmpty() {
        return this.heap.length === 0;
    }
    top() {
        return this.heap[0] ?? null;
    }
    push(value) {
        this.heap.push(value);
        this.heapifyUp();
    }
    heapifyUp() {
        let cur = this.heap.length - 1;
        while (this.hasParent(cur) && this.compare(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0) {
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
            const nextIsRight = this.hasRightChild(cur) && this.compare(this.heap[this.getRightChildIndex(cur)], this.heap[this.getLeftChildIndex(cur)]) < 0;
            const next = nextIsRight ? this.getRightChildIndex(cur) : this.getLeftChildIndex(cur);
            
            if (this.compare(this.heap[cur], this.heap[next]) <= 0) break;
            this.swap(cur, next);
            cur = next;
        }
    }
}

function solution(n, works) {
    const calcFatigue = (acc, cur) => acc + cur ** 2;
    const maxHeap = new Heap((a, b) => works[b] - works[a]);
    works.forEach((_, index) => maxHeap.push(index));
    
    while (n && !maxHeap.isEmpty()) {
        const index = maxHeap.pop();
        works[index] -= 1;
        if (works[index] > 0) 
            maxHeap.push(index);
        n -= 1;
    }
    
    return works.reduce(calcFatigue, 0);
}