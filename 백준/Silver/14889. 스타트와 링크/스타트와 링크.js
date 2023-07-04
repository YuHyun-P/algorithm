const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, S) {
  const calcTeam = (team) => {
    let total = 0;
    for (let i = 0; i < team.length; i++) {
      for (let j = i + 1; j < team.length; j++) {
        total += S[team[i]][team[j]] + S[team[j]][team[i]];
      }
    }
    return total;
  };

  const getMinDiff = (cur, teamA, teamB) => {
    if (cur === N) {
      return Math.abs(calcTeam(teamA) - calcTeam(teamB));
    }

    let min = Infinity;

    if (teamA.length < N / 2) {
      teamA.push(cur);
      min = Math.min(min, getMinDiff(cur + 1, teamA, teamB));
      teamA.pop();
    }

    if (teamB.length < N / 2) {
      teamB.push(cur);
      min = Math.min(min, getMinDiff(cur + 1, teamA, teamB));
      teamB.pop();
    }

    return min;
  };

  return getMinDiff(1, [0], []);
}

const N = Number(input.shift());
const S = input.map((row) => row.split(" ").map(Number));
console.log(solution(N, S));
