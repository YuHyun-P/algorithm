const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, testCase) {
  let answer = "";

  const test = (student) => {
    let matchedCount = 0;
    const visited = Array(student.length).fill(false);

    const getTeam = (start) => {
      visited[start] = true;
      const path = [start];
      let cur = student[start];

      while (!visited[cur]) {
        visited[cur] = true;
        path.push(cur);
        cur = student[cur];
      }
      path.push(cur);

      return path.length - path.indexOf(cur) - 1;
    };

    for (let start = 1; start < student.length; start++) {
      if (!visited[start]) {
        matchedCount += getTeam(start);
      }
    }

    return student.length - 1 - matchedCount;
  };

  for (let t = 0; t < T; t++) {
    answer +=
      test([-1, ...testCase[2 * t + 1].trim().split(" ").map(Number)]) + "\n";
  }
  return answer.trimEnd();
}

const T = Number(input.shift().trim());
console.log(solution(T, input));
