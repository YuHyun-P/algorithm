const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split(" ");

const N = Number(input);
console.log(Number(selectionSort([...String(N)]).join("")));

function selectionSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] > array[maxIdx]) {
        maxIdx = j;
      }
    }

    [array[i], array[maxIdx]] = [array[maxIdx], array[i]];
  }

  return array;
}
