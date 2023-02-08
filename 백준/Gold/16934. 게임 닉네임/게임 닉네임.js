const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
    this.count = 0;
  }
}
class Trie {
  root = new Node(null);
  add(word) {
    let last = word.length;
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!cur.children.has(char)) {
        cur.children.set(char, new Node(char));
        last = Math.min(last, i + 1);
      }
      cur = cur.children.get(char);
    }
    cur.count += 1;

    return cur.count > 1
      ? `${word.slice(0, last)}${cur.count}`
      : word.slice(0, last);
  }
}

let cursor = 0;
let N = Number(input[cursor++]);
const trie = new Trie();

while (N) {
  console.log(trie.add(input[cursor++].trim()));
  N -= 1;
}
