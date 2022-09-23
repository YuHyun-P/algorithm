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

    if (this.size === 0) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    this.size++;
  }

  dequeue() {
    if (this.size === 0) return null;

    const value = this.head.value;
    this.head = this.head.next;

    if (this.size === 1) this.tail = null;

    this.size--;

    return value;
  }
}

function solution(n, info) {
  const ryanInfos = [];

  const bfs = (start) => {
    const queue = new Queue();
    const ryanInfo = Array(info.length).fill(0);
    let restArrow = n;

    queue.enqueue({ score: start, ryanInfo, restArrow });

    while (queue.size > 0) {
      const cur = queue.dequeue();

      const canAcquire = cur.restArrow > 0 && cur.score < info.length - 1;
      if (!canAcquire) {
        ryanInfos.push([...cur.ryanInfo]);
        continue;
      }

      for (
        let restScore = cur.score + 1;
        restScore < info.length;
        restScore++
      ) {
        const infoIndex = info.length - 1 - restScore;
        const requireArrow = info[infoIndex] + 1;

        if (requireArrow > cur.restArrow) continue;

        const ryanInfo = [...cur.ryanInfo];
        ryanInfo[infoIndex] = requireArrow;

        queue.enqueue({
          score: restScore,
          ryanInfo: ryanInfo,
          restArrow: cur.restArrow - requireArrow,
        });
      }
    }
  };

  bfs(0);
  let maxDiff = -1;
  let answer = null;

  ryanInfos.forEach((ryanInfo) => {
    let ryanScore = 0;
    let apeachScore = 0;

    ryanInfo.forEach((ryanArrow, index) => {
      const apeachArrow = info[index];
      const score = info.length - 1 - index;

      if (ryanArrow > apeachArrow) {
        ryanScore += score;
      } else if (ryanArrow === apeachArrow && ryanArrow === 0) {
        return;
      } else {
        apeachScore += score;
      }
    });

    const diff = ryanScore - apeachScore;
    if (diff > 0 && maxDiff <= diff) {
      maxDiff = diff;
      answer = ryanInfo;
    }
  });
    
  if (answer === null) return [-1];

  const ryanArrow = answer.reduce((acc, cur) => acc + cur, 0);
  if (ryanArrow < n) {
    answer[answer.length - 1] = n - ryanArrow;
  }

  return answer;
}
