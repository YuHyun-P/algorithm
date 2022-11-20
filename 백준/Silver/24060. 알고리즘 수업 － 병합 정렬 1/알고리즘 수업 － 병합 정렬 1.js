const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [N, K] = input[0].trim().split(" ").map(Number);
const array = input[1].trim().split(" ").map(Number);

let k = 0;
let answer = -1;

mergeSort(array, 0, array.length - 1);
console.log(answer);

function mergeSort(array, left, right) {
  if (right <= left) return;
  const mid = Math.floor((right + left) / 2);
  mergeSort(array, left, mid);
  mergeSort(array, mid + 1, right);
  merge(array, left, mid, right);
}

function merge(array, left, mid, right) {
  const sortedArray = [];

  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    if (array[i] > array[j]) {
      sortedArray.push(array[j]);
      j++;
    } else {
      sortedArray.push(array[i]);
      i++;
    }

    updateK(sortedArray);
  }

  while (i <= mid) {
    sortedArray.push(array[i]);
    i++;
    updateK(sortedArray);
  }

  while (j <= right) {
    sortedArray.push(array[j]);
    j++;
    updateK(sortedArray);
  }

  i = left;
  let cur = 0;
  while (cur < sortedArray.length) {
    array[i++] = sortedArray[cur++];
  }
}

function updateK(array) {
  const value = array.at(-1);
  k++;

  if (k === K) answer = value;
}
