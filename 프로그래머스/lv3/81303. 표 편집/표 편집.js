class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(node) {
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
      return;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
  }

  remove(node) {
    const nextNode = node.next;
    const prevNode = node.prev;

    if (!prevNode) {
      this.head = nextNode;
      return nextNode;
    }

    prevNode.next = nextNode;

    if (!nextNode) {
      this.tail = prevNode;
      return prevNode;
    }

    nextNode.prev = prevNode;
    return nextNode;
  }

  restore(node) {
    const prevNode = node.prev;
    const nextNode = node.next;

    if (prevNode) prevNode.next = node;
    if (nextNode) nextNode.prev = node;
    if (!nextNode) this.tail = node;
  }
}

function solution(n, k, cmd) {
  const list = new DoublyLinkedList();
  const deletedNode = [];
  let curr;
  Array.from({ length: n }, (_, index) => index).forEach((index) => {
    const newNode = new Node(index);
    if (index === k) curr = newNode;

    list.append(newNode);
  });

  cmd.forEach((command) => {
    const [alphabet, xStr] = command.split(" ");
    let x = parseInt(xStr, 10);

    switch (alphabet) {
      case "U":
        let prevU = curr;
        while (x > 0) {
          prevU = prevU.prev;
          x--;
        }
        curr = prevU;
        break;
      case "D":
        let prevD = curr;
        while (x > 0) {
          prevD = prevD.next;
          x--;
        }
        curr = prevD;
        break;
      case "C":
        deletedNode.push(curr);
        curr = list.remove(curr);
        break;
      case "Z":
        const node = deletedNode.pop();
        list.restore(node);
        break;
    }
  });

  const answer = new Array(n).fill("O");
  deletedNode.forEach((node) => (answer[node.value] = "X"));
  return answer.join("");
}
