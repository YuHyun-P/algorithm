const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value) {
    this.head = this.tail = new Node(value);
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const value = this.head.value;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }

    return value;
  }

  isEmpty() {
    return this.tail === null;
  }
}

const totalTestCase = Number(input.shift().trim());

const bfs = ([source, target]) => {
  const LIMIT = 10000;
  const visited = Array(10000).fill(false);
  let shortestHistory = "";

  const calculator = [
    {
      command: "D",
      fn: (n) => {
        return (2 * n) % LIMIT;
      },
    },
    {
      command: "S",
      fn: (n) => {
        return n === 0 ? LIMIT - 1 : n - 1;
      },
    },
    {
      command: "L",
      fn: (n) => {
        const nString = n.toString().padStart(4, "0");
        return Number(nString.slice(1) + nString[0]);
      },
    },
    {
      command: "R",
      fn: (n) => {
        const nString = n.toString().padStart(4, "0");
        return Number(nString.at(-1) + nString.slice(0, -1));
      },
    },
  ];

  const queue = new Queue([source, ""]);
  visited[source] = true;

  while (!queue.isEmpty() && shortestHistory === "") {
    const [value, history] = queue.dequeue();

    for (let i = 0; i < calculator.length; i++) {
      const { command, fn } = calculator[i];
      const nextValue = fn(value);

      if (nextValue === target) {
        shortestHistory = history + command;
        break;
      }

      if (visited[nextValue]) {
        continue;
      }

      visited[nextValue] = true;
      queue.enqueue([nextValue, history + command]);
    }
  }

  return shortestHistory;
};

console.log(
  input.map((line) => bfs(line.trim().split(" ").map(Number))).join("\n")
);
