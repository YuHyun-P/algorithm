const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, target) {
  class Node {
    constructor(value) {
      this.value = value;
      this.prev = null;
      this.next = null;
    }
  }
  class DoublyCircularLinkedList {
    head = null;
    size = 0;
    addLast(value) {
      const newNode = new Node(value);
      if (!this.head) {
        this.head = newNode;
        newNode.next = this.head;
        newNode.prev = this.head;
      } else {
        const prevNode = this.head.prev;
        newNode.next = this.head;
        newNode.prev = prevNode;
        prevNode.next = newNode;
        this.head.prev = newNode;
      }
      this.size += 1;
    }
    removeHead() {
      const value = this.head.value;
      if (this.size === 1) {
        this.head = this.tail = null;
      } else {
        const nextNode = this.head.next;
        const prevNode = this.head.prev;
        nextNode.prev = prevNode;
        prevNode.next = nextNode;
        this.head.prev = null;
        this.head.next = null;
        this.head = nextNode;
      }
      this.size -= 1;
      return value;
    }
    search(value) {
      if (this.head.value === value) {
        return 0;
      }

      let cur = this.head.next;
      let count = 1;
      while (cur !== this.head) {
        if (cur.value === value) {
          return count;
        }
        cur = cur.next;
        count += 1;
      }

      return -1;
    }
    left() {
      this.head = this.head.next;
    }
    right() {
      this.head = this.head.prev;
    }
    getSize() {
      return this.size;
    }
    toString() {
      if (this.size === 0) {
        return [];
      }

      const result = [this.head.value];
      let cur = this.head.next;
      while (cur !== this.head) {
        result.push(cur.value);
        cur = cur.next;
      }
      return result;
    }
  }

  const queue = new DoublyCircularLinkedList();
  for (let num = 1; num <= N; num++) {
    queue.addLast(num);
  }

  const getMinCount = (num) => {
    const size = queue.getSize();
    const fromHead = queue.search(num);

    if (fromHead <= size - fromHead) {
      for (let index = 0; index < fromHead; index++) {
        queue.left();
      }
    } else {
      for (let index = 0; index < size - fromHead; index++) {
        queue.right();
      }
    }
    queue.removeHead();
    return Math.min(fromHead, size - fromHead);
  };

  return target.map(getMinCount).reduce((acc, cur) => acc + cur, 0);
}

const [N, M] = input[0].trim().split(" ").map(Number);
const target = input[1].trim().split(" ").map(Number);
console.log(solution(N, target));
