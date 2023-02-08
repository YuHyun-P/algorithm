const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
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
    }
  }
  isPrefix(word) {
    let cur = this.root;
    for (const char of word) {
      if (!cur.children.has(char)) return false;
      cur = cur.children.get(char);
    }
    return true;
  }
}

let cursor = 0;
let [N, M] = input[cursor++].split(" ").map(Number);
let count = 0;
const trie = new Trie();

while (N) {
  trie.add(input[cursor++].trim());
  N -= 1;
}

while (M) {
  if (trie.isPrefix(input[cursor++].trim())) {
    count += 1;
  }
  M -= 1;
}

console.log(count);
