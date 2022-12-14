const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const totalTestCase = Number(input.shift().trim());
const answer = Array(totalTestCase)
  .fill(0)
  .map(() => {
    const categoryCount = new Map();
    const n = Number(input.shift().trim());
    input
      .splice(0, n)
      .map((line) => line.trim().split(" "))
      .forEach(([name, category]) =>
        categoryCount.set(category, (categoryCount.get(category) ?? 0) + 1)
      );

    return (
      [...categoryCount.entries()].reduce(
        (acc, [category, count]) => acc * (count + 1),
        1
      ) - 1
    );
  });

console.log(answer.join("\n"));
