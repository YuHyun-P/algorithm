const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "large_hand3.in";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(words, boggles) {
  let max = 0;
  const trie = new Trie();

  words.forEach((word) => {
    trie.add(word);
    max = Math.max(word.length, max);
  });

  return boggles.map((board) => play(trie, board, max)).join("\n");
}

function play(trie, boggle, max) {
  const SIZE = 4;
  const SCORE = [0, 0, 0, 1, 1, 2, 3, 5, 11];

  let maxWord = "";
  let total = 0;
  const found = new Set();
  const dx = [0, 1, 1, 1, 0, -1, -1, -1];
  const dy = [1, 1, 0, -1, -1, -1, 0, 1];
  const visited = Array.from(Array(SIZE), () => Array(SIZE).fill(false));

  const outOfBound = (x, y) => x < 0 || y < 0 || SIZE <= x || SIZE <= y;
  const compare = (wordA, wordB) =>
    SCORE[wordB.length] - SCORE[wordA.length] || (wordA < wordB ? -1 : 1);
  const dfs = (x, y, node, path) => {
    if (node.isWord && !found.has(path)) {
      if (maxWord === "" || compare(path, maxWord) < 0) maxWord = path;
      total += SCORE[path.length];
      found.add(path);
    }

    if (path.length === max) {
      return;
    }

    for (let i = 0; i < dx.length; i++) {
      const nextX = x + dx[i];
      const nextY = y + dy[i];

      if (outOfBound(nextX, nextY) || visited[nextX][nextY]) continue;

      const nextChar = boggle[nextX][nextY];
      if (!node.children.has(nextChar)) continue;

      visited[nextX][nextY] = true;
      dfs(nextX, nextY, node.children.get(nextChar), path + nextChar);
      visited[nextX][nextY] = false;
    }
  };

  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      const char = boggle[x][y];
      if (!trie.root.children.has(char)) continue;
      visited[x][y] = true;
      dfs(x, y, trie.root.children.get(char), char);
      visited[x][y] = false;
    }
  }

  return [total, maxWord, found.size].join(" ");
}

class Node {
  constructor(value) {
    this.value = value;
    this.children = new Map();
    this.isWord = false;
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
    cur.isWord = true;
  }
}

let cursor = 0;
let w = Number(input[cursor++]);
const words = [];
while (w) {
  words.push(input[cursor++].trim());
  w -= 1;
}

cursor += 1;
const b = Number(input[cursor++]);
const boggles = Array(b).fill(null);
for (let i = 0; i < b; i++) {
  boggles[i] = input.slice(cursor, cursor + 4).map((row) => row.trim());
  cursor += 5;
}

console.log(solution(words, boggles));
