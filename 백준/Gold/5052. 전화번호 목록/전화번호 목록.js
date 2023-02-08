const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  root = new Node(null);
  add(word) {
    let cur = this.root;
    for (const char of word) {
      if (!cur.children.has(char)) {
        cur.children.set(char, new Node(char));
      }
      cur = cur.children.get(char);
      if (cur.isEnd) {
        return false;
      }
    }

    cur.isEnd = true;
    return cur.children.size === 0;
  }
}

let cursor = 0;
const T = Number(input[cursor++]);
for (let tc = 0; tc < T; tc++) {
  const trie = new Trie();
  let n = Number(input[cursor++]);
  const words = [];

  while (n) {
    words.push(input[cursor++].trim());
    n -= 1;
  }

  const isConsistent = words.every((word) => trie.add(word));
  console.log(isConsistent ? "YES" : "NO");
}
