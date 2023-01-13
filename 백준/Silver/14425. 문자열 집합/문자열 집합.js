const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Trie {
  constructor(children) {
    this.isEnd = [];
    this.maxChildren = children;
    this.next = [Array(this.maxChildren).fill(-1)];
    this.last = 1;
    this.root = 0;
  }
  char2Int(char) {
    return char.charCodeAt(0) - "a".charCodeAt(0);
  }
  insert(word) {
    let cur = this.root;
    for (let w = 0; w < word.length; w++) {
      const index = this.char2Int(word[w]);
      if (this.next[cur][index] === -1) {
        this.next[cur][index] = this.last;
        this.last += 1;
        this.next.push(Array(this.maxChildren).fill(-1));
        this.isEnd.push(false);
      }
      cur = this.next[cur][index];
    }
    this.isEnd[cur] = true;
  }
  has(word) {
    let cur = this.root;
    for (const char of word) {
      const index = this.char2Int(char);
      if (this.next[cur][index] === -1) {
        return false;
      }
      cur = this.next[cur][index];
    }
    return this.isEnd[cur];
  }
}

function solution(wordList, query) {
  const MAX_CHILDREN = 26;
  const trie = new Trie(MAX_CHILDREN);
  let count = 0;

  wordList.forEach((word) => trie.insert(word.trim()));
  query.forEach((word) => trie.has(word) && count++);
  return count;
}

const [N, M] = input.shift().trim().split(" ").map(Number);
const word = input.splice(0, N);
console.log(solution(word, input));
