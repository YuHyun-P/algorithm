const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

const [N, M, rest = ""] = input;

const target = Number(N.trim());
const remoteControl = (() => {
  const brokenNumList = rest
    .split(" ")
    .filter((char) => char !== "")
    .map(Number);
  return Array.from(Array(10), (_, num) => num).filter(
    (_, num) => !brokenNumList.includes(num)
  );
})();
const TARGET_LIMIT = 500000;
const CUR_CHANNEL = 100;
const fromCur = Math.abs(CUR_CHANNEL - target);
let min = fromCur;

for (let channel = 0; channel < TARGET_LIMIT * 2; channel++) {
  const channelLength = channel.toString().length;
  const canPush = [...channel.toString()].every((char) =>
    remoteControl.includes(Number(char))
  );
  if (canPush) {
    min = Math.min(min, channelLength + Math.abs(target - channel));
  }
}

console.log(min);
