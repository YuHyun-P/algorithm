const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, K, student) {
  const LIMIT = 6;
  const gradeCount = Array.from(Array(LIMIT + 1), () => [0, 0]);
  let room = 0;

  student.forEach(([sex, grade]) => {
    gradeCount[grade][sex] += 1;
  });
  gradeCount.forEach(([female, male]) => {
    room += Math.ceil(female / K) + Math.ceil(male / K);
  });
  return room;
}

const [N, K] = input.shift().trim().split(" ").map(Number);
const student = input.map((row) => row.trim().split(" ").map(Number));
console.log(solution(N, K, student));
