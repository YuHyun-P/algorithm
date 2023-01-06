```js
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
        // 모든 정점의 outdegree가 1이기 때문에 하나의 사이클 내에 서브 사이클이 존재할 수 없음
        // 사이클에 존재하지 않는 학생들은 다른 사이클에 포함될 수 없음
        // 이미 사이클에 포함된 학생들도 다른 사이클에 포함될 수 없음
        visited[cur] = true;
        path.push(cur);
        cur = student[cur];
      }
      path.push(cur);

      // 사이클의 길이를 반환
      // 사이클이 없다면, path.indexOf(cur) === path.length - 1 이므로 0이 반환됨
      // 사이클이 있다면, path.indexOf(cur) < path.length -1 이므로 사이클의 길이가 반환됨
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
    // 메모리 제한이 작기에 테스트하기 전에 필요한 입력값만 파싱
    answer +=
      test([-1, ...testCase[2 * t + 1].trim().split(" ").map(Number)]) + "\n";
  }
  return answer.trimEnd();
}

const T = Number(input.shift().trim());
console.log(solution(T, input));
```
