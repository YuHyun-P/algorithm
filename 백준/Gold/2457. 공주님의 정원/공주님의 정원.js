const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, flower) {
  const START = 0;
  const END = 1;
  flower.sort((a, b) => a[START] - b[START] || a[END] - b[END]);

  let last = 0;
  let cur = 301;
  let count = 0;

  while (last < flower.length && flower[last][END] <= cur) {
    last += 1;
  }

  while (cur < 1201) {
    let next = cur;

    while (last < flower.length && flower[last][START] <= cur) {
      next = Math.max(next, flower[last][END]);
      last += 1;
    }

    if (next === cur) {
      return 0;
    }

    cur = next;
    count += 1;
  }

  return count;
}

const N = Number(input.shift().trim());
const flower = input.map((row) => {
  const [startMonth, startDay, endMonth, endDay] = row
    .trim()
    .split(" ")
    .map(Number);

  return [startMonth * 100 + startDay, endMonth * 100 + endDay];
});
console.log(solution(N, flower));

// reference https://github.com/encrypted-def/basic-algo-lecture/blob/master/0x11/solutions/2457.cpp
