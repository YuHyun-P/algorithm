let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    }

    this.size--;
    return value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const [N, _] = input[0].trim().split(" ").map(Number);

const graph = Array.from(Array(N + 1), () => []);
for (let line = 1; line < input.length; line++) {
  const [u, v] = input[line].trim().split(" ").map(Number);
  graph[u].push(v);
  graph[v].push(u);
}

let count = 0;
const visited = Array(N + 1).fill(false);
const queue = new Queue();

for (let start = 1; start < N + 1; start++) {
  if (visited[start]) continue;

  queue.enqueue(start);
  visited[start] = true;

  while (!queue.isEmpty()) {
    const cur = queue.dequeue();

    graph[cur].forEach((next) => {
      if (visited[next]) return;

      visited[next] = true;
      queue.enqueue(next);
    });
  }

  count++;
}

console.log(count);
