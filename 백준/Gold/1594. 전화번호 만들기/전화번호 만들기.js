const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, number) {
  const maxScore = Array(N + 1).fill(-1);
  let maxNumber = "";
  const option = [2, 3];

  const calcScore = (word) => {
    let max = 0;
    const count = Array(10).fill(0);

    for (let i = 0; i < word.length; i++) {
      count[Number(word[i])] += 1;
      max = Math.max(max, count[Number(word[i])]);
    }

    if (word.length === max) return 2;
    if (word.length === 3 && max === 2) return 1;
    return 0;
  };
  const dfs = (index, score, curNumber) => {
    if (index === N) {
      if (maxScore[index] < score) {
        maxScore[index] = score;
        maxNumber = curNumber;
      }

      return;
    }

    if (maxScore[index] >= score) return;
    maxScore[index] = score;

    for (const offset of option) {
      if (index + offset > N) continue;
      const group = number.slice(index, index + offset);
      const nextScore = score + calcScore(group);

      dfs(
        index + offset,
        nextScore,
        curNumber === "" ? group : curNumber + "-" + group
      );
    }
  };

  dfs(0, 0, "");

  return maxNumber;
}

const number = input[0].trim();
console.log(solution(number.length, number));
