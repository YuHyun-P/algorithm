let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [testCase, ...questionList] = input.map(Number);
const countDp = [0, 1, 2, 4];
const fillCountDp = () => {
  const N_LIMIT = 11;
  for (let n = 4; n < N_LIMIT; n++) {
    countDp.push(countDp[n - 1] + countDp[n - 2] + countDp[n - 3]);
  }
};
fillCountDp();

console.log(questionList.map((question) => countDp[question]).join("\n"));
